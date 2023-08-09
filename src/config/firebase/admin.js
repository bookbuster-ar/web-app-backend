var admin = require('firebase-admin');

const {
  FIREBASE_TYPE,
  FIREBASE_PROJECT_ADMIN_ID,
  FIREBASE_PRIVATE_ADMIN_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CLIENT_ID,
  FIREBASE_AUTH_URI,
  FIREBASE_TOKEN_URI,
  FIREBASE_PROVIDER_CERT_URL,
  FIREBASE_CLEINT_CERT_URL,
} = require('@utils/env');

admin.initializeApp({
  credential: admin.credential.cert({
    type: FIREBASE_TYPE,
    project_id: FIREBASE_PROJECT_ADMIN_ID,
    private_key_id: FIREBASE_PRIVATE_ADMIN_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: FIREBASE_CLIENT_EMAIL,
    client_id: FIREBASE_CLIENT_ID,
    auth_uri: FIREBASE_AUTH_URI,
    token_uri: FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: FIREBASE_PROVIDER_CERT_URL,
    client_x509_cert_url: FIREBASE_CLEINT_CERT_URL,
  }),
});

module.exports = admin;
