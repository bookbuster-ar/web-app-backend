const { validate } = require('uuid');

const validReactionType = [
  'mld',
  'mct',
  'pv',
  'sf',
  'ppl',
  'rom',
  'ado',
  'nfnf',
  'pro',
  'pp',
  'esp',
  'jeeb',
  'adi',
  'pplp',
  'hap',
];

// Me lo devoré: 'mld',
// Me costó terminarlo: 'mct',
// Para viajar: 'pv',
// Soy Fan: 'sf',
// Preparate para llorar: 'ppl',
// Romántico: 'rom',
// Adorable: 'ado',
// Ni fu ni fa: 'nfnf',
// Profundo: 'pro',
// Para regalar: 'pp',
// Espeluznante: 'esp',
// Justo en el blanco: 'jeeb',
// Adictivo: 'adi',
// Perfecto para la playa: 'pplp',
// He aprendido mucho: 'hap'

const reviewValidator = (req, res, next) => {
  const { bookId } = req.params;
  const { content, rating, reaction } = req.body;

  if (!bookId || !validate(bookId)) {
    return res.status(400).json({
      error: 'Debe proporcionar una identificación de libro válida (UUID)',
    });
  }

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

  if (reaction) {
    if (!validReactionType.includes(reaction)) {
      return res.status(400).json({
        error: 'La reacción proporcionada no es válida',
      });
    }
  }

  next();
};

module.exports = reviewValidator;
