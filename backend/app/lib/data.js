const fs = require('fs');
const path = require('path');
const pool = require('../../databasePool');
const helpers = require('./helpers');

const lib = {};

// Base directory
lib.baseDir = path.join(__dirname, './../.data/');

lib.readVariablesForDynamicContent = (data,  callback) => {
  /**
   * SCHEMA
   * 
   */
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
  const category = (albums || songs || clothes || other) !== undefined
    ? (albums || songs || clothes || other)
    : '';

  // Query depends of category
  let sql = '';
  let vars = [val];
  if (category === 'albums') {
    sql = 'SELECT id, album FROM albums WHERE id = $1';
  }
  
  if (category === 'songs') {
    sql = `SELECT songs.id, song, album, "albumId" FROM songs
    INNER JOIN albums ON songs."albumId" = albums.id
    WHERE songs.id = $1`;
  }
  
  if (category === 'clothes') {
    sql = `SELECT clothes.id, cloth, album, quantity FROM clothes
    INNER JOIN albums ON clothes."albumId" = albums.id
    WHERE clothes.id = $1`;
  }

  if (category === 'other') {
    sql = 'SELECT id, other, quantity FROM other WHERE id = $1';
  }

  pool.query(sql, vars, (error, response) => {
    if (!error && response.rows.length > 0) {
      callback('DB data loaded: ', response.rows);
    } else {
      callback(`DB Error. Couldn't read from DB. Template "${vars}" is not correct or it returned 0 records.`, error);
    }
  });
};

// Reading retular variables (from html)
lib.readRegularVariablesFromDB = (dir, data, callback) => {
  /**
   * dir - directory, database name in this case
   * data - url object (path like index, about etc and additional paramss like id, album etc)
   * callback - send the message and the data (if valid) from db
   */

  const sql = `SELECT variable, text FROM variables
              INNER JOIN pages ON variables."pageId" = pages.id
              INNER JOIN sections ON variables."sectionId" = sections.id
              WHERE page = $1`;
  const vars = [data];
  pool.query(sql, vars, (error, response) => {
    if (!error && response.rows.length > 0) {
      callback('DB data loaded: ', response.rows);
    } else {
      callback(`DB Error. Couldn't read from DB. Template "${vars}" is not correct or it returned 0 records.`, error);
    }
  });
};

// Eksporting module
module.exports = lib;
