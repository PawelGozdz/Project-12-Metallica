const server = require('../bin/server');

const app = {};

app.init = () => {
  // Uruchamianie servera
  server.init();
};

app.init();
