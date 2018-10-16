// HANDLERS
const dataModify = require('./data');
const helpers = require('./helpers');

const handlers = {};

/**
 * HTML handlers
 */

// Index
handlers.index = (data, callback) => {
  // Odrzucanie zapyań innych niż GET
  if (data.method === 'get') {
    new Promise((resolve, reject) => {
      dataModify.readVariablesFromDB('metallicadb', 'index', (text, dbData) => {
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
            callback(405, undefined, 'html');
          }
        });
      })
      .catch(errr => console.log(Error(errr)));
  }
};

// Events
handlers.events = (data, callback) => {
  // Odrzucanie zapyań innych niż GET
  if (data.method === 'get') {
    new Promise((resolve, reject) => {
      dataModify.readVariablesFromDB('metallicadb', 'events', (text, dbData) => {
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
        helpers.getTemplate('events', el, (error, string) => {
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

// Assets
handlers.assets = (data, callback) => {
  // Odrzucanie innych metod niż GET
  if (data.method === 'get') {
    // Pobieranie pliku
    const trimmedAssetName = data.trimmedPath.replace('assets/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Wczytywanie danych
      helpers.getStaticAssets(trimmedAssetName, (err, dataa) => {
        if (!err && dataa) {
          // Sprawdzanie jakiegy typu jest content (defaultowo plain text)
          let contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }

          if (trimmedAssetName.indexOf('.png') > -1) {
            contentType = 'png';
          }

          if (trimmedAssetName.indexOf('.jpg') > -1) {
            contentType = 'jpg';
          }

          if (trimmedAssetName.indexOf('.ico') > -1) {
            contentType = 'favicon';
          }

          // Zwracanie danych
          callback(200, dataa, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

// notFound
handlers.notFound = (data, callback) => {
  callback(404, { Error: 'Nie ma takiej strony...' });
};

// Export handlers
module.exports = handlers;
