/**
 * Helpers
 */

const path = require('path');
const fs = require('fs');
const config = require('../../secret/config');

const helpers = {};

// Passing JSON string and parsing it into an object
helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (err) {
    return {};
  }
};

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
        callback('Error, Couldn\'t read the template. Check if exists.');
      }
    });
  } else {
    callback(`Error: No "${templateName}" template!`);
  }
};

// Adding default header & footer
// Passing data from object for footer & header interpolation
helpers.addUniversalTemplates = (str, data, callback) => {
  str = typeof (str) === 'string' && str.length > 0 ? str : '';
  data = typeof (data) === 'object' && data !== null ? data : {};

  // Reading the HEADER
  helpers.getTemplate('_header', data, (error, headerString) => {
    if (!error && headerString) {
      // Reading the FOOTER
      helpers.getTemplate('_footer', data, (err, footerString) => {
        if (!err && footerString) {
          const fullString = `${headerString}${str}${footerString}`;
          callback(false, fullString);
        } else {
          callback('No "_footer" template!');
        }
      });
    } else {
      callback('No "_header" template!');
    }
  });
};

// Interpolating variables
helpers.interpolate = (str, data) => {
  str = typeof (str) === 'string' && str.length > 0 ? str : '';
  data = typeof (data) === 'object' && data !== null ? data : {};

  // Adding global variables
  const globals = config.templateGlobals;

  Object.entries(globals).forEach((el) => {
    const [key, val] = el;
    data[`global.${key}`] = val;
  });

  // For each key in 'data' Object, we want to swap its value for string with the new value

  Object.entries(data).forEach((el) => {
    const [key, val] = el;
    if (typeof (key) === 'string') str = str.replace(`{${key}}`, val);
  });

  return str;
};

// Getting (css, js, img etc) files
helpers.getStaticAssets = (fileName, callback) => {
  // There were some issues with compiling SCSS and loading background images
  // as there were getting an extra assets/css path name
  // therefore some extra check needs to be done in case if exists

  fileName = fileName.indexOf('css/assets/img') > -1 ? fileName.replace('css/assets/img', 'img') : fileName;
  fileName = typeof (fileName) === 'string' && fileName.length > 0 ? fileName : false;

  if (fileName) {
    const publicDir = path.join(__dirname, '../../../frontend/dist/assets/');

    fs.readFile(publicDir + fileName, (err, data) => {
      if (!err && data) {
        callback(false, data);
      } else {
        callback('File not found!');
      }
    });
  }
};

// Export module
module.exports = helpers;
