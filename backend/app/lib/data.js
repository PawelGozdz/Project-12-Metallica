const fs = require('fs');
const path = require('path');
const pool = require('../../databasePool');
const helpers = require('./helpers');

const lib = {};

// Base directory
lib.baseDir = path.join(__dirname, './../.data/');

lib.readSpecificItemFromDB = (data, callback) => {
  if (typeof (data.queryStringObject) !== 'object' && data.queryStringObject.length < 1) {
    return callback('Data format is wrong!');
  }

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

// lib.readCategoryRecordsCount = (category, callback) => {
//   if (typeof (category) !== 'string' && category.length < 10) {
//     return callback('Data format is wrong!');
//   }
//   pool.query(sql, vars, (error, response) => {
//     if (!error && response.rows.length > 0) {
//       // console.log(response.rows);
//       callback('DB data loaded: ', response.rows);
//     } else {
//       callback('DB Error. Couldn\'t read from DB. Data is not correct or it returned 0 records.', error);
//     }
//   });
// };

lib.readMultipleRecordsFromDB = (data, callback) => {
  if (typeof (data) !== 'object' && Object.keys(data).length > 0) {
    return callback('Data format is wrong!');
  }
  
  // const newData = data;
  // const newData = Object.entries(data).reduce((acc, val, i, arr) => {
  //   // Category needed for choosing sql query
  //   const [key, value] = val;
  //   if (i === 0) acc.category = key;
  //   acc[key] = value;
  //   return acc;
  // }, {});

  // Category will be also DB table name
  const albums = data.category === 'album' ? 'albums' : '';
  const songs = data.category === 'song' ? 'songs' : '';
  const clothes = data.category === 'cloth' ? 'clothes' : '';
  const other = data.category === 'other' ? 'other' : '';
  const category = (albums || songs || clothes || other) !== undefined
    ? (albums || songs || clothes || other)
    : '';

  // Query depends of category
  let sql = '';
  let vars = [];

  // Query DB for all 11 records. 0 is N/A therfore it's > 0
  if (category === 'albums') {
    sql = 'SELECT id, album FROM albums WHERE id > 0';
  }

  // Query DB based on selected Album
  if (category === 'songs') {
    // Setting defaults up
    data.album = data.album ? data.album : 1;
    sql = `SELECT songs.id, song, "albumId", album, songs.price FROM songs
          INNER JOIN albums ON songs."albumId" = albums.id
          WHERE "albumId" = $1`;
    // Query multiple songs based on 'albumId', as single song can be selected with 'song=id'
    vars = [data.album];
  }

  // Query cloth based on several conditions
  if (category === 'clothes') {
    // Setting defaults up
    data.subCat = data.subCat ? data.subCat : 'shirt';
    data.size = data.size ? data.size : 'L';
    data.sex = data.sex ? data.sex : 'U';
    sql = `SELECT clothes.id, cloth, "subCat", size, sex, "albumId", clothes.quantity, clothes.price FROM clothes
          INNER JOIN types ON clothes."subCatId" = types.id
          INNER JOIN sizes ON clothes."sizeId" = sizes.id
          INNER JOIN gender ON clothes."genderId" = gender.id
          INNER JOIN albums ON clothes."albumId" = albums.id
          WHERE types."subCat" = $1
          AND sizes.size = $2
          AND gender.sex = $3`;
    vars = [data.subCat, data.size, data.sex];
  }

  // Query Other
  if (category === 'other') {
    sql = `SELECT * FROM other`;
    vars = [];
  }

  pool.query(sql, vars, (error, response) => {
    if (!error && response.rowCount > 0) {
      callback('DB data loaded: ', response.rows);
    } else if (!error && response.rowCount === 0) {
      callback('No record found for these cryterias', [...vars].join());
    } else {
      callback('Please check, if the parameters are correct', error);
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

  if (typeof (data) !== 'string') {
    return callback('Data format is wrong!');
  }

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
