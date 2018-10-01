/*
* Biblioteka do CRUD (db oraz pliki)
*/

const fs = require('fs');
const path = require('path');
const pool = require('../../databasePool');
const helpers = require('./helpers');

const lib = {};

// Definiowanie base directory dla folderu data
lib.baseDir = path.join(__dirname, './../.data/');

// Create
lib.createFile = (dir, file, data, callback) => {
  const stringData = JSON.stringify(data);

  // Otwieranie pliku do zapisu
  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // Zapisanie do pliku i zamknięcie
      fs.writeFile(fileDescriptor, stringData, (error) => {
        if (!error) {
          fs.close(fileDescriptor, (er) => {
            if (!er) {
              callback('Wstawiono do pliku: ', `"${file}"`);
            } else {
              callback('Error, nie udało się zamknąć nowego pliku');
            }
          });
        } else {
          callback('Error, nie udało się zapisać nowego pliku');
        }
      });
    } else {
      callback(`PLIK - Nie udało się utworzyć nowego pliku. "${file}" może już istnieć`);
    }
  });
};
// Create
lib.createDB = (dir, file, data, callback) => {
  // Zapisywanie do bazy danych
  const sql = `INSERT INTO variables(variable, text, "pageId", "sectionId") 
              VALUES ($1, $2, $3, $4)`;
  const vars = [data.variable, data.text, data.pageId, data.sectionId];
  pool.query(sql, vars, (error, response) => {
    if (!error) {
      callback('Wstawiono do DB: ', `"${file}"`);
    } else {
      callback('DB - Error: ', error);
    }
  });
};

// Wczytywanie
lib.readFromFile = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}${dir}/${file}.json`, 'utf8', (err, data) => {
    // Zwracanie obiektu
    if (!err && data) {
      console.log('Zwracam dane z pliku');
      const parsedData = helpers.parseJsonToObject(data);
      callback('Wczytano z pliku: ', parsedData);
    } else {
      callback(`Nie udało się wczytać pliku "${file}". Być może, taki record nie istnieje`);
    }
  });
};
// Wczytywanie
lib.readFromDB = (dir, file, callback) => {
  // Zapisywanie do bazy danych
  const sql = `SELECT variable, text FROM variables
              INNER JOIN pages ON variables."pageId" = pages.id
              INNER JOIN sections ON variables."sectionId" = sections.id
              WHERE page = $1`;
  const vars = [file];
  pool.query(sql, vars, (error, response) => {
    if (!error && response.rows.length > 0) {
      callback('Wczytano z DB: ', response.rows);
    } else {
      callback(`DB Error. Nie udało się wczytać danych z DB. Templatka "${file}" jest nieprawidłowa lub wczytała 0 rezultatów.`, error);
    }
  });
};

// Update instniejących danych do pliku
lib.updateFile = (dir, file, data, callback) => {
  // Konwertowanie do stringa zeby zapisać w pliku
  const stringObj = JSON.stringify(data);

  fs.open(`${lib.baseDir}${dir}/${file}.json`, 'r+', (err, fileDesc) => {
    if (!err && fileDesc) {
      // console.log('FileDesc: ', fileDesc);
      // Przycinanie pliku
      fs.truncate(fileDesc, (error) => {
        // Wprowadzenie nowych danych
        if (!error) {
          fs.writeFile(fileDesc, stringObj, (er) => {
            if (!er) {
              fs.close(fileDesc, (errr) => {
                if (!errr) {
                  callback('Plik nadpisano i zamknięto pomyślnie', `"${file}"`);
                } else {
                  callback(`Problem z zamknięciem pliku "${file}"`);
                }
              });
            } else {
              callback(`Nie udało sie nadpisać istniejącego pliku "${fileDesc}"`);
            }
          });
        } else {
          callback(`Error! Nie udało się przyciąć "${fileDesc}".`);
        }
      });
    } else {
      callback(`Error! Nie można otworzyć pliku do updatu. Sprawdź czy "${file}" istnieje.`);
    }
  });
};
// Update instniejących danych do DB
lib.updateDB = (dir, file, data, callback) => {
  // Konwertowanie do stringa zeby zapisać w pliku
  const stringObj = JSON.stringify(data);

  const sql = 'UPDATE variables SET variable=$1, text=$2, "pageId"=$3, "sectionId"=$4 WHERE variable=$1';
  const vars = [data.variable, data.text, data.pageId, data.sectionId];
  pool.query(sql, vars, (error, response) => {
    if (!error && response.rowCount > 0) {
      callback('DB nadpisano pomyślnie', `"${file}"`);
    } else {
      callback(`DB problem z nadpisaniem recordu "${file}"`);
    }
  });
};

// Delete
lib.deleteFile = (dir, file, callback) => {
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, (err) => {
    if (!err) {
      callback('File usunięto pomyślnie', `"${file}"`);
    } else {
      callback(`Error, nie udało się usunąć pliku "${file}" z folderu "${dir}". Plik prawdopodobnie nie istnieje`);
    }
  });
};
// Delete
lib.deleteDB = (dir, file, callback) => {
  const sql = 'DELETE FROM element WHERE template=$1';
  const vars = [file];
  pool.query(sql, vars, (error, response) => {
    if (!error && response.rowCount > 0) {
      callback('DB usunięto pomyślnie', `"${file}"`);
    } else {
      callback(`Error, nie udało się usunąć recordu "${file}". Ten prawdopodobnie już nie istnieje w DB`);
    }
  });
};

// Eksporting module
module.exports = lib;
