import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as compression from 'compression';
import * as express from 'express';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');
const fs = require('fs');
const path = require('path');
const filterEnv = require('filter-env');
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
enableProdMode();
const dotenv = require('dotenv');
dotenv.config();
const config = filterEnv(/(BB_\w+)/, { json: true, freeze: true });
import { ROUTES } from './src/routes';
const PORT = process.env.BB_PORT || 443;

//Added to remove server db connent issue 
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Provide support for window on the server
const domino = require('domino');
const template = fs.readFileSync(path.join('dist/browser', 'index.html')).toString();
const fetch = require('node-fetch');
const win = domino.createWindow(template);

win.fetch = fetch;
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
global['document'] = win.document;
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

const app = express();

var tls = require('tls');
var https = require('https');
var privateKey = fs.readFileSync('./../ssl/keys/random_private_key.key', 'utf8');
var certificate = fs.readFileSync('./../ssl/certs/www_skillsgrow_com_ba552_43d23_1585495837_4543fe0fce1f2bccaac07cda2c200480.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
tls.createSecureContext({ key: privateKey, cert: certificate });
var httpsServer = https.createServer(credentials, app);

// Config renderer
try {
  app.engine('html', (_, options, callback) => {
    const engine = ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'REQUEST', useFactory: () => options.req, deps: [] },
        { provide: 'CONFIG', useFactory: () => config, deps: [] }
      ]
    });
    engine(_, options, callback);
  });
} catch (e) {
  console.log('error', 'there is sonme issue defining app engine ' + e);
}

// configs
app.enable('etag');

// Middleware
app.use(compression());
app.set('view engine', 'html');
app.set('views', 'dist/browser');
app.set('view cache', true);
app.use('/', express.static('dist/browser', { index: false, maxAge: 30 * 86400000 }));

// All regular routes use the Universal engine
app.get('', (req, res) => {
  res.render('index', {
    req: req,
    res: res,
    preboot: true
  });
});

function getAllRoute(route) {
  try {
    app.get(route, (req, res) => {
      res.render('index', {
        req,
        res,
        preboot: true
      })
    })
  } catch (error) {
    console.log(error);
  }
}

function postAllRoute(route) {
  try {
    app.get(route, (req, res) => {
      res.render('index', {
        req,
        res,
        preboot: true
      })
    })
  } catch (error) {
    console.log(error);
  }
}

ROUTES.forEach((route) => {
  try {
    getAllRoute(route);
    postAllRoute(route);
  } catch (error) {
    console.log(error);
  }
})


app.get('/env', (req, res) => {
  res.json(process.env);
})

// app.listen(PORT, () => {
//   console.log(`we are serving the site for you on port:${PORT}!`);
// });

httpsServer.listen(PORT, () => {
   console.log(`we are serving the site for you on port:${PORT}!`);
});

var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);