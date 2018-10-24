const server = require('../bin/server');

const app = {};

app.init = () => {
  // Start the server
  server.init();
};

app.init();
