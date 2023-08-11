const reviewValidator = (req, res, next) => {
  const { content, rating } = req.body;

  const review = {
    maxContentLength: 200,
    minContentLength: 12,
    minRatingValue: 1,
    maxRatingValue: 5,
  };

  if (!content) {
    return res.status(400).json({
      error: 'Debe proporcionar un contenido para la revisión',
    });
  }

  if (
    typeof content !== 'string' ||
    content.trim().length < review.minContentLength
  ) {
    return res.status(400).json({
      error: `El contenido debe tener al menos ${review.minContentLength} caracteres`,
    });
  }

  if (content.trim().length > review.maxContentLength) {
    return res.status(400).json({
      error: `El contenido no debe exceder los ${review.maxContentLength} caracteres`,
    });
  }

  if (rating === undefined) {
    return res.status(400).json({
      error: 'Debe proporcionar una calificación',
    });
  }

  if (
    !Number.isInteger(rating) ||
    rating < review.minRatingValue ||
    rating > review.maxRatingValue
  ) {
    return res.status(400).json({
      error: `La calificación debe ser un entero entre ${review.minRatingValue} y ${review.maxRatingValue}`,
    });
  }

  next();
};

module.exports = reviewValidator;
