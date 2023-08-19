const validateImageFile = (req, res, next) => {
  const { cover, extra, image } = req.files;

  if (!cover && !extra && !image) {
    return next();
  }

  const combinedFiles = cover || extra ? [...cover, ...extra] : [...image];

  const invalidFile = combinedFiles.some((file) => !file.buffer);

  if (invalidFile) {
    return res
      .status(400)
      .json({ error: 'Al menos un archivo no tiene un formato válido' });
  }

  const validImageExtension = ['jpg', 'jpeg', 'png'];

  const validImages = combinedFiles.every((file) =>
    validImageExtension.includes(file.mimetype.split('/')[1])
  );

  if (!validImages) {
    return res.status(400).json({
      error: 'Algún archivo no es una imagen válida o está corrupto',
    });
  }

  next();
};

module.exports = validateImageFile;
