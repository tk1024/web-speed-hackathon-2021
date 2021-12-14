import fs from "fs"
import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import compression from 'compression';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';
import { Post } from "./models";
import { CLIENT_DIST_PATH } from "./paths";

const html = fs.readFileSync(CLIENT_DIST_PATH + "/index.html")

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

app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.raw({ limit: '10mb' }));

app.get("/", async (req, res) => {
  const posts = await Post.findAll({
    limit: 10,
    offset: 0,
  });
  res.send(html.toString().replace("</title>", `</title><script>var initialProps = ${JSON.stringify(posts)}</script>`))
})

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
