/**
 * Helpers
 */

const path = require('path');
const fs = require('fs');
const config = require('../../secret/config');

const helpers = {};

// Przekazywanie stringu JSON i przerabianie go na obiekt, bez wywalania erroru w aplikacji
helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (err) {
    return {};
  }
};

// Wczytywanie template
helpers.getTemplate = (templateName, data, callback) => {
  templateName = typeof (templateName) === 'string' && templateName.length > 0 ? templateName : false;
  data = typeof (data) === 'object' && data !== null ? data : {};

  if (templateName) {
    const templateDir = path.join(__dirname, '../templates/');
    fs.readFile(`${templateDir}${templateName}.html`, 'utf8', (error, str) => {
      if (!error && str && str.length > 0) {
        const finalString = helpers.interpolate(str, data);
        callback(false, finalString);
      } else {
        callback('Error, Nie udało się załadować templatki! Sprawdź czy taka istnieje.');
      }
    });
  } else {
    callback('Error: Nazwa templatki nie została określona!');
  }
};

// Dodawanie defaultowego headera i footera do stringa. 
// Dostarczanie danych z obiektu do footera i headera do interpolacji
helpers.addUniversalTemplates = (str, data, callback) => {
  str = typeof (str) === 'string' && str.length > 0 ? str : '';
  data = typeof (data) === 'object' && data !== null ? data : {};

  // Ładowanie headera
  helpers.getTemplate('_header', data, (error, headerString) => {
    if (!error && headerString) {
      // Ładowanie footera
      helpers.getTemplate('_footer', data, (err, footerString) => {
        if (!err && footerString) {
          const fullString = `${headerString}${str}${footerString}`;
          callback(false, fullString);
        } else {
          callback('Template "_footer" nie został znaleziony!');
        }
      });
    } else {
      callback('Template "_header" nie został znaleziony!');
    }
  });
};

// Znajdowanie oraz podmiana przekazanych stringów z obiektem data i jego keys i values
helpers.interpolate = (str, data) => {
  str = typeof (str) === 'string' && str.length > 0 ? str : '';
  data = typeof (data) === 'object' && data !== null ? data : {};

  // Dodanie zmiennych globalnych
  const globals = config.templateGlobals;

  Object.entries(globals).forEach((el) => {
    const [key, val] = el;
    data[`global.${key}`] = val;
  });

  // Dla każdego key w data Object, chcemy podmienić jego value do stringa w odpowiadające miejsce

  Object.entries(data).forEach((el) => {
    const [key, val] = el;
    if (typeof (key) === 'string') { str = str.replace(`{${key}}`, val); }
  });

  return str;
};

// Export module
module.exports = helpers;
