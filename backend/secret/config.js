// Kontener dla env

const environments = {};

// Staging (default) env
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashingSecret: 'toJestTajemnica',
  templateGlobals: {
    year: '2018',
    site: 'metallica.com',
    author: 'Paweł Góźdź',
    website: 'http://rwd-stronyinternetowe.pl'
  }
};

// Production env

environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashingSecret: 'toJestTajemnica',
  templateGlobals: {
    year: '2018',
    site: 'metallica.com',
    author: 'Paweł Góźdź',
    website: 'http://rwd-stronyinternetowe.pl'
  }
};

// Wyświetlanie, który env będzie argumentem
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Sprawdzanie czy currentEnvironment jest jednym ze zdefiniowanych w obiekcie environments
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// Module export
module.exports = environmentToExport;
