var admin = require('firebase-admin');

var serviceAccount = require('../../auth-bookbuster.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
