// HANDLERS

const handlers = {};


// notFound
handlers.notFound = (data, callback) => {
  callback(404, { Error: 'Nie ma takiej strony...' });
};

// Export handlers
module.exports = handlers;
