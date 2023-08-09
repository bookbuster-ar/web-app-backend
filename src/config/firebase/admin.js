var admin = require('firebase-admin');

var serviceAccount = require('./credential/auth-bookbuster.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
