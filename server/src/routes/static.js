import Router from 'express-promise-router';
import serveStatic from 'serve-static';
import expressStaticGzip from "express-static-gzip";

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

router.use(
  serveStatic(UPLOAD_PATH, {
    maxAge: 10 * 60 * 1000
  }),
);

router.use(
  expressStaticGzip(PUBLIC_PATH, {
    enableBrotli: true,
    customCompressions: [{
      encodingName: 'deflate',
      fileExtension: 'zz'
    }],
    orderPreference: ['br'],
    maxAge: 10 * 60 * 1000
  }),
);

router.use("/scripts",
  expressStaticGzip(`${CLIENT_DIST_PATH}/scripts`, {
    enableBrotli: true,
    customCompressions: [{
      encodingName: 'deflate',
      fileExtension: 'zz'
    }],
    orderPreference: ['br'],
    maxAge: 10 * 60 * 1000
  }),
);

export { router as staticRouter };
