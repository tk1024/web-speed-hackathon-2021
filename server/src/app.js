import fs from "fs"
import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';

import sharp from "sharp"
import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import { PUBLIC_PATH } from "./paths";

const app = Express();

app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.use('/api/v1', apiRouter);
app.use("/images", async function (req, res, next) {
  const path = `${PUBLIC_PATH}/images${req.path}`
  const avifPath = `${PUBLIC_PATH}/images${req.path}`.replace("jpg", "avif")
  if (!fs.existsSync(avifPath)) {
    await sharp(path).avif({ chromaSubsampling: '4:2:0' }).toFile(avifPath)
  }
  if (`${req.path}`.indexOf("jpg") > -1) {
    res.redirect(301, `/images${req.path}`.replace("jpg", "avif"))
  } else {
    next()
  }
  // const image = fs.readFileSync(avifPath)
  // res.writeHead(200, { 'Content-Type': 'image/avif' });
  // res.end(image, 'binary');
  // next()
})

app.use(staticRouter);

export { app };
