import Router from 'express-promise-router';
import serveStatic from 'serve-static';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

const router = Router();

router.use(
  serveStatic(UPLOAD_PATH, {
    etag: false,
    lastModified: false,
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    etag: false,
    lastModified: false,
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    etag: false,
    lastModified: false,
    index: false,
  }),
);

export { router as staticRouter };
