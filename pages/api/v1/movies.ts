import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { UserJwt } from '../../../lib/user-jwt';
import { convertMovie } from '../../../server/src/converters/convert_movie';
import { UPLOAD_PATH } from '../../../server/src/paths';

// 変換した動画の拡張子
const EXTENSION = 'mp4';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "POST") {
    const userJwt = UserJwt(req, res)
    const session = userJwt.get()

    if (session.userId === undefined) {
      throw new Error() // throw new httpErrors.Unauthorized();
    }

    const movie = Buffer.from(req.body, "base64")

    if (Buffer.isBuffer(movie) === false) {
      throw new httpErrors.BadRequest();
    }

    const movieId = uuidv4();

    // next.jsだとnode起動にwasm使うオプションつけたりするの分からなかったので一旦変換なし
    // const converted = await convertMovie(movie, {
    //   // 動画の拡張子を指定する
    //   // @ts-ignore
    //   extension: EXTENSION,
    //   // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
    //   size: undefined,
    // });

    const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`);
    await fs.writeFile(filePath, movie); //converted);

    return res.status(200).send({ id: movieId });
  }
}