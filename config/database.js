const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri: 'mongodb://localhost/AuthMEANStack',
  secret: crypto,
  db: 'AuthMEANStack'
};