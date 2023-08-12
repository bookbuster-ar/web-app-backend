const { ReviewLike } = require('../models');

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

const reviewLikeValidator = async (req, res, next) => {
  const { userid: userId } = req.headers;
  const { reviewId } = req.params;
  const { reactionType } = req.body;

  if (!reactionType) {
    return res
      .status(400)
      .send({ message: 'Es necesario proporcionar un tipo de reacción' });
  }

  if (!validReactionType.includes(reactionType)) {
    return res
      .status(400)
      .send({ message: 'La reacción proporcionada no es válida' });
  }

  const repeatedReaction = await ReviewLike.findOne({
    where: { review_id: reviewId, user_id: userId, type: reactionType },
  });

  if (repeatedReaction) {
    return res.status(400).send({
      message: `El usuario ya tiene una reacción con «${reactionType}» en esta reseña`,
    });
  }

  next();
};

module.exports = reviewLikeValidator;
