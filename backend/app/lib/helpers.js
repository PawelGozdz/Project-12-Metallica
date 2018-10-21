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

// Print on the page dynamically records 
// helpers.printDynamicRecords = (dbRecs = [], element = 'div', attributes = '') => {
//   /**
//    * dbRecs - array with records from DB
//    * element - element to create
//    * attributes - attributes to assign
//    */

//    // Each element from dbRecs might have different href, src etc
//   let attrList = '';

//   for (const attr in attributes) {
//     attrList += ` ${attr}="${attributes[attr]}"`;
//   }
  
//   return dbRecs.reduce((acc, val, i, ar) => {
//     // Base on number elements from [], loop over and create appropriate element using template literals

//     acc += `
//       <${element}${attrList}>
//         ${typeof (val) === 'object' ? Object.keys(val).map(key => val[key]) : val}
//       </${element}>`;
//     return acc;
//   }, '');
// };

// const arr = [{ song: 'Hit the Lights', album: 'Reload' }, { song: 'The Four Horsemen' }, { song: 'Jump in the Fire' }, { song: 'Whiplash' }];
// // const arr = ['Hit the Lights', 'The Four Horsemen'];
// const test = helpers.printDynamicRecords(arr, 'div', { class: 'open', type: 'submit', href: '' });
// console.log(test);

// Reading template
helpers.getTemplate = (templateName, data, callback) => {
  templateName = typeof (templateName) === 'string' && templateName.length > 0 ? templateName : false;
  data = typeof (data) === 'object' && data !== null ? data : {};

  if (templateName) {
    const templateDir = path.join(__dirname, '../../../frontend/dist/');
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

// Pobieranie plików (css, js, img etc) js/index.js
helpers.getStaticAssets = (fileName, callback) => {
  // Background-image kompilowane w scss, dostają dodatkowy przedrostek assets/css,
  // który powoduje błąd w pobieraniu tych zdjęć
  fileName = fileName.indexOf('css/assets/img') > -1 ? fileName.replace('css/assets/img', 'img') : fileName;
  fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;

  if (fileName) {
    const publicDir = path.join(__dirname, '../../../frontend/dist/assets/');

    fs.readFile(publicDir + fileName, (err, data) => {
      if (!err && data) {
        callback(false, data);
      } else {
        callback('Nie znaleziono pliku');
      }
    });
  }
};

// Export module
module.exports = helpers;
