import bodyParser from 'body-parser';
import compression from 'compression';
import Express from 'express';
import session from 'express-session';
import fs from "fs";
import { CLIENT_DIST_PATH } from './paths';
import { apiRouter } from './routes/api';
import { pageInitialProps } from './routes/pgaeInitialProps';
import { staticRouter } from './routes/static';

const app = Express();
const html = fs.readFileSync(CLIENT_DIST_PATH + "/index.html", { encoding: "utf-8" })

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

app.use('/api/v1', apiRouter);
app.use(staticRouter);

app.use(async (req, res) => {
  const fallback = await pageInitialProps(req.url)
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(html.replace("</head>", `<script id="initialProps" type="application/json">${JSON.stringify({ props: { fallback } })}</script></head>`));
  res.end();
});

export { app };
