const validateImageFile = (req, res, next) => {
  // const file = req.file;
  // if (
  //   !file ||
  //   !file.name ||
  //   !file.size ||
  //   typeof file.lastModified !== 'number'
  // ) {
  //   return res.status(400).json({
  //     error: 'The object provided is not a valid file',
  //   });
  // }

  // const fileExtension = file.name.split('.').pop().toLowerCase();

  // const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  // if (!validImageExtensions.includes(fileExtension)) {
  //   return res.status(400).json({
  //     error: 'The file provided is not a valid image',
  //   });
  // }

  next();
};

module.exports = validateImageFile;
