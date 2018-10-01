// HANDLERS
const dataModify = require('./data');
const helpers = require('./helpers');

const handlers = {};

// Index
handlers.index = (data, callback) => {
  // Odrzucanie zapyań innych niż GET
  if (data.method === 'get') {
    new Promise((resolve, reject) => {
      dataModify.readFromDB('metallicadb', 'index', (text, dbData) => {
        if (dbData) {
          resolve(dbData);
        } else {
          reject(dbData);
        }
      });
    })
      .then((arr) => {
        // Wyciaganie tabeli z obiektami i przypisywanie ich do jednego "newObj"
        const newObj = {};
        arr.forEach((element) => {
          const { variable: key, text: val } = element;
          newObj[key] = val;
        });
        return newObj;
      })
      .then((el) => {
        // Wczytanie odpowiedniego template html i odesłanie go jako string
        helpers.getTemplate('index', el, (error, string) => {
          if (!error && string) {
            helpers.addUniversalTemplates(string, el, (err, str) => {
              if (!err && str) {
                // Zwracanie pełnego stringa z zawartością strony
                callback(200, str, 'html');
              } else {
                callback(500, undefined, 'html');
              }
            });
          } else {
            console.log('Error lub brak str.', error);
            callback(500, undefined, 'html');
          }
        });
      })
      .catch(errr => console.log(Error(errr)));
  }
};

// notFound
handlers.notFound = (data, callback) => {
  callback(404, { Error: 'Nie ma takiej strony...' });
};

// Export handlers
module.exports = handlers;
