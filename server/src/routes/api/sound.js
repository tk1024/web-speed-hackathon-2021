import Router from 'express-promise-router';
import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import _ from 'lodash';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AudioContext } from 'web-audio-api';
import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';

// 変換した音声の拡張子
const EXTENSION = 'mp3';

const router = Router();

async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.zip(leftData, rightData).map(_.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = chunks.map(_.mean);
  // chunk の平均の中から最大値を取る
  const max = _.max(peaks);

  return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const createSVG = async (soundPath) => {
  const buffer = await fs.readFile(soundPath)
  const { max, peaks } = await calculate(buffer)

  return (
    `${peaks.map((peak, idx) => {
      const ratio = peak / max;
      return `<rect fill="#2563EB" height="${ratio}" width="1" x="${idx}" y="${1 - ratio}" />`
    })}`
  )

};

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();

  const { artist, title } = await extractMetadataFromSound(req.body);

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);
  
  const svg = await createSVG(filePath)
  await fs.writeFile(`${filePath.replace("mp3", "svg").replace("sounds", "sound-svgs")}`, svg)

  return res.status(200).type('application/json').send({ artist, id: soundId, title });
});

export { router as soundRouter };
