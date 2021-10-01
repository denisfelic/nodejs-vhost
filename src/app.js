const express = require('express');
const app = express();
const apps = [express(), express()];

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public')); //Serves resources from public folder


// middleware
const vhost = (hostname, app) => (req, res, next) => {
  const host = req.headers.host.split(':')[0];
  if (host === hostname || host === `www.${hostname}`) {
    return app(req, res, next);
  }
  else {
    next();
  }
}

const hostname = 'denis-dev.com'
//clients, apply middleware
app.use(vhost(`palmeiras.${hostname}`, apps[0]));
app.use(vhost(`magic.${hostname}`, apps[1]));

apps[0].set('view engine', 'ejs');
apps[0].set('views', path.join(__dirname, '/views'));
// routes
apps[0].get('/', (req, res) => {
  return res.render('institucional', { siteName: 'Palmeiras' });
});
apps[1].get('/', (req, res) => {
  return res.send('server3 - client magic');
});

app.get('/', (req, res) => {
  return res.render('institucional', { siteName: 'Test' });
  return res.send(`server1  - institucional`);
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running http://${hostname}:${port}`));