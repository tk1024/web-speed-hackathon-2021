import fs from "fs";
import type { NextApiRequest, NextApiResponse } from 'next';
import path from "path";
import subsetFont from 'subset-font';
import { UPLOAD_PATH } from '../../../server/src/paths';

const fontBasePath = path.resolve(UPLOAD_PATH, `./fonts/`);
const font = fs.readFileSync(`${fontBasePath}/a.ttf`);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const mySfntFontBuffer = Buffer.from(font);

  // Create a new font with only the characters required to render "Hello, world!" in WOFF2 format:
  const subsetBuffer = await subsetFont(mySfntFontBuffer, req.query.text, {
    targetFormat: 'woff2',
  });

  fs.writeFileSync(`${fontBasePath}/auto/subset.woff2`, subsetBuffer);

  res.status(200).send(`
  @font-face {
    font-display: block;
    font-family: '源暎エムゴ';
    font-weight: 400;
    src: url(${`/fonts/auto/subset.woff2`}) format('woff2');
  }
  `)
}