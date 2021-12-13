import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import { UserJwt } from '../../../lib/user-jwt';
import { convertImage } from '../../../server/src/converters/convert_image';
import { UPLOAD_PATH } from '../../../server/src/paths';

// 変換した画像の拡張子
const EXTENSION = 'avif';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === "POST") {
    const userJwt = UserJwt(req, res)
    const session = userJwt.get()

    if (session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }

    const image = Buffer.from(req.body, "base64")

    if (Buffer.isBuffer(image) === false) {
      throw new httpErrors.BadRequest();
    }

    const baseImageId = uuidv4();

    const converted = await convertImage(image, {
      // 画像の拡張子を指定する
      // @ts-ignore
      extension: EXTENSION,
      // 画像の縦サイズを指定する (undefined は元画像に合わせる)
      height: undefined,
      // 画像の横サイズを指定する (undefined は元画像に合わせる)
      width: undefined,
    });

    const { width, height } = await sharp(converted).metadata()
    const imageId = [baseImageId, width, height].join("-")

    const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
    await fs.writeFile(filePath, converted);

    return res.status(200).send({ id: imageId });
  }
}