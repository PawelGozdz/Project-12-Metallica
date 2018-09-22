const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');
const handlers = require('./handlers');

const server = {};

server.httpServer = http.createServer((req, res) => {
  server.unifiedServer(req, res);
});

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
      payload: buffer
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
  // '': index
};

server.init = () => {
  server.httpServer.listen(3000, () => {
    console.log('The server is listening on port 3000');
  });
};

// Export server
module.exports = server;
