const validateImageFile = (req, res, next) => {
  const fileList = req.files;
  const invalidFile = fileList.some((file) => !file.buffer);

  if (invalidFile) {
    return res
      .status(400)
      .json({ error: 'Al menos un archivo no tiene un formato válido' });
  }

  const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  const allImagesValid = fileList.every((file) =>
    validImageExtensions.includes(file.mimetype.split('/')[1])
  );

  if (!allImagesValid) {
    return res.status(400).json({
      error: 'Algún archivo no es una imagen válida o está corrupto',
    });
  }

  next();
};

module.exports = validateImageFile;
