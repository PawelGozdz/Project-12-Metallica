const http = require('http');
const https = require('https');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const handlers = require('../app/lib/handlers');
const config = require('../secret/config');
const helpers = require('../app/lib/helpers');
const fs = require('fs');

const server = {};

// Creating http server
server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});

// Creating https server
// const httpsServerOptions = {
//   key: fs.readFileSync('../app/https/key.pem'),
//   cert: fs.readFileSync('../app/https/cert.pem')
// };
// server.httpsServer = https.createServer(httpsServerOptions, (req, res) => {
//   server.unifiedServer(req, res);
// });

// Server logic
server.unifiedServer = (req, res) => {
  // Parsing URL
  const parsedUrl = url.parse(req.url, true);

  // Reading the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Reading query string object
  const queryStringObject = parsedUrl.query;

  // Reading HTTP method
  const method = req.method.toLowerCase();

  // Reading headers as an object
  const { headers } = req.headers;

  // Loading payload
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // Choosing which handler should be used. 'notFound' as default
    let chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // If request comes from 'assets', choose 'assets' handler. 
    // This handler is for (css, img, js, itc) files
    chosenHandler = trimmedPath.indexOf('assets/') > -1 ? handlers.assets : chosenHandler;

    // Creting request object and send it to the handler
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer)
    };
    
    // Passing the 'request data' object to the hahndler
    chosenHandler(data, (statusCode, payload, contentType) => {
      /**
       * statusCode - status code send back by the handler
       * payload - string with data (html page, css, js files etc)
       * contentType - header
       */

      // Checking contentType. 'json' by default
      contentType = typeof (contentType) === 'string' ? contentType : 'json';
      // Checking statusCode. 200 by default
      statusCode = typeof (statusCode) === 'number' ? statusCode : 200;

      // Validating payload for specific contentTypes
      let payloadString = '';
      if (contentType === 'json') {
        res.setHeader('Content-Type', 'application/json');
        // Empty object by default if handler returns empty payload
        payload = typeof (payload) === 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }

      if (contentType === 'html') {
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof (payload) === 'string' ? payload : '';
      }

      if (contentType === 'favicon') {
        res.setHeader('Content-Type', 'image/x-icon');
        payloadString = typeof (payload) !== 'undefined' ? payload : '';
      }

      if (contentType === 'css') {
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof (payload) !== 'undefined' ? payload : '';
      }

      if (contentType === 'png') {
        res.setHeader('Content-Type', 'image/png');
        payloadString = typeof (payload) !== 'undefined' ? payload : '';
      }

      if (contentType === 'jpg') {
        res.setHeader('Content-Type', 'image/jpeg');
        payloadString = typeof (payload) !== 'undefined' ? payload : '';
      }

      if (contentType === 'plain') {
        res.setHeader('Content-Type', 'text/plain');
        payloadString = typeof (payload) !== 'undefined' ? payload : '';
      }

      // Return response common for all content types
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

// Request Routers
server.router = {
  '': handlers.index,
  events: handlers.events,
  assets: handlers.assets
};

server.init = () => {
  server.httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} mode.`);
  });

  // server.httpsServer.listen(config.httpsPort, () => {
  //   console.log(`The server is listening on port ${config.httpsPort} in ${config.envName} mode.`);
  // });
};

// Export server
module.exports = server;
