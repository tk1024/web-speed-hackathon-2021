import Router from 'express-promise-router';
import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import path from 'path';
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';


// 変換した画像の拡張子
const EXTENSION = 'avif';

const router = Router();

router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const imageId = uuidv4();

  const converted = await convertImage(req.body, {
    // 画像の拡張子を指定する
    extension: EXTENSION,
    // 画像の縦サイズを指定する (undefined は元画像に合わせる)
    height: undefined,
    // 画像の横サイズを指定する (undefined は元画像に合わせる)
    width: undefined,
  });

  const { width, height } = await sharp(imageFile).metadata()

  const filePath = path.resolve(UPLOAD_PATH, `./images/${[imageId, width, height].join("-")}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ id: imageId });
});

export { router as imageRouter };
