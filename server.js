// server.js
const next = require('next');
const express = require('express');
const https = require("https");

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000;
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express();

  server.use(express.static('/app/public'))

  server.all('*', (req, res) => {
    // if ([/images/, /movies/, /sounds/, /sound-svgs/].some(pattern => req.url.indexOf(pattern) === 0)) {
    //   console.log(`/app/public${req.url}`)
    //   res.sendFile(`/app/public${req.url}`);
    //   return;
    // }

    // If not a static file, just let next.js do the rest
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    https.get("https://wsh-2021-tk1024.herokuapp.com/api/v1/initialize")
    console.log('> Ready on http://localhost:${port}');
  });
})
