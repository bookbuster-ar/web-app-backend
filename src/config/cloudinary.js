const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'djfa22pkl',
  api_key: '116441872949191',
  api_secret: 'yR24niCu7u624avuAd2iwPVUKPg',
});

module.exports = cloudinary;
