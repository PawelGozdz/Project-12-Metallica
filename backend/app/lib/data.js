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

lib.readVariablesForDynamicContent = (data,  callback) => {
  let val;
  let key;
  for (const x in data.queryStringObject) {
    key = x;
    val = parseInt(data.queryStringObject[key]);
  }

  // Category will be also DB table name
  const albums = key === 'album' ? 'albums' : '';
  const songs = key === 'song' ? 'songs' : '';
  const clothes = key === 'cloth' ? 'clothes' : '';
  const other = key === 'other' ? 'other' : '';
  const category = (albums || songs || clothes || other);

  // Query depends of category
  let sql = '';
  const vars = [val];
  if (category === 'albums') {
    sql = 'SELECT id, album FROM albums WHERE id = $1';
  }

  if (category === 'songs') {
    sql = `SELECT songs.id, song, album, "albumId" FROM songs
    INNER JOIN albums ON songs."albumId" = albums.id
    WHERE songs.id = $1`;
  }

  if (category === 'clothes') {
    sql = `SELECT clothes.id, cloth, album FROM clothes
    INNER JOIN albums ON clothes."albumId" = albums.id
    WHERE clothes.id = $1`;
  }

  if (category === 'other') {
    sql = 'SELECT id, other FROM other WHERE id = $1';
  }

  pool.query(sql, vars, (error, response) => {
    if (!error && response.rows.length > 0) {
      callback('Wczytano z DB: ', response.rows);
    } else {
      callback(`DB Error. Nie udało się wczytać danych z DB. Templatka "${vars}" jest nieprawidłowa lub wczytała 0 rezultatów.`, error);
    }
  });
};

// Wczytywanie
lib.readRegularVariablesFromDB = (dir, data, callback) => {
  /**
   * dir - directory, database name in this case
   * data - url object (path like index, about etc and additional paramss like id, album etc)
   * callback - send the message and the data (if valid) from db
   */

  // Zapisywanie do bazy danych
  const sql = `SELECT variable, text FROM variables
              INNER JOIN pages ON variables."pageId" = pages.id
              INNER JOIN sections ON variables."sectionId" = sections.id
              WHERE page = $1`;
  const vars = [data];
  pool.query(sql, vars, (error, response) => {
    if (!error && response.rows.length > 0) {
      callback('Wczytano z DB: ', response.rows);
    } else {
      callback(`DB Error. Nie udało się wczytać danych z DB. Templatka "${data}" jest nieprawidłowa lub wczytała 0 rezultatów.`, error);
    }
  });
};

// Eksporting module
module.exports = lib;
