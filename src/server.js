const express = require('express');
const app = express();
const app2 = express();
const app3 = express();

// middleware
const vhost = (hostname, app) => (req, res, next) => {
  const host = req.headers.host.split(':')[0];
  if (host === hostname) {
    return app(req, res, next);
  }
  else {
    next();
  }
}
//clients, apply middleware
app.use(vhost('palmeiras.localhost', app2));
app.use(vhost('magic.localhost', app3));

// routes
app2.get('/', (req, res) => {
  return res.send('server2 - client palmeiras');
});
app3.get('/', (req, res) => {
  return res.send('server3 - client magic');
});

app.get('/', (req, res) => {
  return res.send(`server1  - institucional`);
});

// start server
const port = 3000;
app.listen(port, () => console.log(`server running http://localhost:${port}`));