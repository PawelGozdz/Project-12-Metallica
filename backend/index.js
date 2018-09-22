const server = require('./app/lib/server');

const app = {};

app.init = () => {
  server.init();
};

app.init();
