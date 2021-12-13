import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import { AudioContext } from 'web-audio-api';
import { UserJwt } from '../../../lib/user-jwt';
import { convertSound } from '../../../server/src/converters/convert_sound';
import { UPLOAD_PATH } from '../../../server/src/paths';
import { extractMetadataFromSound } from '../../../server/src/utils/extract_metadata_from_sound';


// 変換した音声の拡張子
const EXTENSION = 'mp3';

async function calculate(data: any) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  // 左の音声データの絶対値を取る
  // @ts-ignore
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  // @ts-ignore
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.zip(leftData, rightData).map(_.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(_.mean);
  // chunk の平均の中から最大値を取る
  const max = _.max(peaks) as number;

  return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const createSVG = async (soundPath: string) => {
  const buffer = await fs.readFile(soundPath)
  const { max, peaks } = await calculate(buffer)

  return (
    // @ts-ignore
    `${peaks.map((peak, idx) => {
      const ratio = peak / max;
      return `<rect fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}" />`
    })}`
  )

};

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "POST") {
    const userJwt = UserJwt(req, res)
    const session = userJwt.get()

    if (session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }

    const sound = Buffer.from(req.body, "base64")

    if (Buffer.isBuffer(sound) === false) {
      throw new httpErrors.BadRequest();
    }

    const soundId = uuidv4();

    const { artist, title } = await extractMetadataFromSound(sound);

    // next.jsだとnode起動にwasm使うオプションつけたりするの分からなかったので一旦変換なし
    // const converted = await convertSound(sound, {
    //   // 音声の拡張子を指定する
    //   // @ts-ignore
    //   extension: EXTENSION,
    // });

    const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
    await fs.writeFile(filePath, sound); // converted);

    const svg = await createSVG(filePath)
    await fs.writeFile(`${filePath.replace("mp3", "svg").replace("sounds", "sound-svgs")}`, svg)

    return res.status(200).send({ artist, id: soundId, title });
  }
}