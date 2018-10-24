// HANDLERS
const dataModify = require('./data');
const helpers = require('./helpers');

const handlers = {};

/**
 * HTML handlers
 */

// Index page + shopping section
handlers.index = (data, callback) => {
  // Rejecting other than GET methods
  if (data.method === 'get') {
    // Determine between loading whole index page
    // or updating 'shopping' section with variables from DB
    console.log(data.queryStringObject);
    if (Object.keys(data.queryStringObject).length > 0) {
      new Promise((resolve, reject) => {
        dataModify.readVariablesForDynamicContent(data, (text, dbData) => {
          if (dbData) {
            resolve(dbData);
          } else {
            reject(dbData);
          }
        });
      })
        .then((dbdata) => {
          callback(200, dbdata[0], 'json');
        })
        .catch(errr => console.log(Error(errr)));

    } else {
      // It runs if no parameters in URL (index.html)
      new Promise((resolve, reject) => {
        // Rading specific page variables from DB
        dataModify.readRegularVariablesFromDB('metallicadb', 'index', (text, dbData) => {
          if (dbData) {
            resolve(dbData);
          } else {
            reject(dbData);
          }
        });
      })
        .then((arr) => {
          // Creating a new Obj with the data from DB
          const newObj = {};
          arr.forEach((element) => {
            const { variable: key, text: val } = element;
            newObj[key] = val;
          });
          return newObj;
        })
        .then((el) => {
          // Reading the correct template (index in this case) and process it as a string
          helpers.getTemplate('index', el, (error, string) => {
            if (!error && string) {
              helpers.addUniversalTemplates(string, el, (err, str) => {
                if (!err && str) {
                  // Returning a full page template (page + header + footer)
                  callback(200, str, 'html');
                } else {
                  callback(500, undefined, 'html');
                }
              });
            } else {
              console.log('Error. No string.', error);
              callback(405, undefined, 'html');
            }
          });
        })
        .catch(errr => console.log(Error(errr)));
    }

  }
};

// Events page
handlers.events = (data, callback) => {
  // Rejecting other than GET methods
  if (data.method === 'get') {
    new Promise((resolve, reject) => {
      // Rading specific page variables from DB
      dataModify.readRegularVariablesFromDB('metallicadb', 'events', (text, dbData) => {
        if (dbData) {
          resolve(dbData);
        } else {
          reject(dbData);
        }
      });
    })
      .then((arr) => {
        // Creating a new Obj with the data from DB
        const newObj = {};
        arr.forEach((element) => {
          const { variable: key, text: val } = element;
          newObj[key] = val;
        });
        return newObj;
      })
      .then((el) => {
        // Reading the correct template (events in this case) and process it as a string
        helpers.getTemplate('events', el, (error, string) => {
          if (!error && string) {
            helpers.addUniversalTemplates(string, el, (err, str) => {
              if (!err && str) {
                // Returning a full page template (page + header + footer)
                callback(200, str, 'html');
              } else {
                callback(500, undefined, 'html');
              }
            });
          } else {
            console.log('Error. No string.', error);
            callback(500, undefined, 'html');
          }
        });
      })
      .catch(errr => console.log(Error(errr)));
  }
};

// Assets
handlers.assets = (data, callback) => {
  // Rejecting other than GET methods
  if (data.method === 'get') {
    // Preparing the path
    const trimmedAssetName = data.trimmedPath.replace('assets/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Reading the file
      helpers.getStaticAssets(trimmedAssetName, (err, dataa) => {
        if (!err && dataa) {
          // Checking what type of content it is (plain as default)
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

          // Returning the file
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
  callback(404, { Error: 'Page Not Found...' });
};

// Export handlers
module.exports = handlers;
