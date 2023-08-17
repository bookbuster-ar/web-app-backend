const { getRecommendation } = require('../../controllers');
const handleRecommendation = async (req, res) => {
  try {
    const format = req.query.format;
    const pages = req.query.pages;
    const nacionality_author = req.query.nacionality_author;
    const genresName = req.query.genres;
    const genresArray = genresName ? genresName.split(',') : [];

    const recommendation = await getRecommendation(      
      format,
      pages,
      genresArray,
      nacionality_author
    );

    return res.status(200).json(recommendation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleRecommendation;
