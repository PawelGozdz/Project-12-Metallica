const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const handlers = require('../app/lib/handlers');
const config = require('../secret/config');
const helpers = require('../app/lib/helpers');
const dataLib = require('../app/lib/data');

const server = {};

server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});

// Testowanie CRUD
// dataLib.createFile('metallicadb', 'faq', { 'head.desc': 'What we offer', 'head.title': 'Music and much more' }, (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.createDB('metallicadb', 'about', { variable: 'head.title', text: 'Our Products', 'pageId': 2, 'sectionId': 2 }, (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.readFromFile('metallicadb', 'index', (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.readFromDB('metallicadb', 'index', (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.updateFile('metallicadb', 'index', { 'head.desc': 'New Metallica website', 'head.title': 'Check our new website' }, (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.updateDB('metallicadb', 'index', { variable: 'head.title', text: 'Our Products', 'pageId': 2, 'sectionId': 2 }, (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.deleteFile('metallicadb', 'faq', (text, data = '') => {
//   console.log(text, data);
// });
// dataLib.deleteDB('metallicadb', 'faq', (text, data = '') => {
//   console.log(text, data);
// });

// console.log(dataLib);
// Logika dla servera
server.unifiedServer = (req, res) => {
  // Parsowanie URL
  const parsedUrl = url.parse(req.url, true);

  // Pobieranie path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Pobieranie query string do obiektu
  const queryStringObject = parsedUrl.query;

  // Pobieranie metody HTTP request
  const method = req.method.toLowerCase();

  // Pobieranie headerów jako obiekt
  const { headers } = req.headers;

  // Pobieranie payload
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    // Wybieranie który handler powinien byc uzyty. 'notFound' jako default
    const chosenHandler = typeof (server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // Konstruowanie obiektu data i przesylanie go do handlera
    const data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: helpers.parseJsonToObject(buffer)
    };

    // Przekierowanie requesta do handlera znajdujacego sie w obiekcie router
    chosenHandler(data, (statusCode, payload, contentType) => {
      // Sprawdzanie statusCode, payload, contentType z powracajácego callbacka
      // contentType później będzie headerem 'html'
      contentType = typeof (contentType) === 'string' ? contentType : 'json';
      // Sprawdzanie statusu powracającego kodu, defaultowo 200
      statusCode = typeof (statusCode) === 'number' ? statusCode : 200;

      // Zwracanie odpowiedzi dla specyficznych content typów
      let payloadString = '';
      if (contentType === 'json') {
        res.setHeader('Content-Type', 'application/json');
        // Walidacja payload powracającego od handlera.
        // Pusty object jako default, jezeli callback zwroci sam kod bez payload
        payload = typeof (payload) === 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }

      if (contentType === 'html') {
        res.setHeader('Content-Type', 'text/html');
        // Walidacja payload powracającego od handlera.
        // Pusty object jako default, jezeli callback zwroci sam kod bez payload
        payloadString = typeof (payload) === 'string' ? payload : '';
      }

      // Zwracanie odpowiedzi wspólnych dla wszystkich "content typów"
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

// Routery
server.router = {
  '': handlers.index
};

server.init = () => {
  server.httpServer.listen(config.httpPort, () => {
    console.log(`The server is listening on port ${config.httpPort} in ${config.envName} mode.`);
  });
};

// Export server
module.exports = server;
