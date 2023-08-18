const { getRecommendation } = require('../../controllers');
const handleRecommendation = async (req, res) => {
  try {
    const format = req.query.format;
    const pages = req.query.pages;
    const author_nationality = req.query.author_nationality;
    const genresName = req.query.genres;
    const genresArray = genresName ? genresName.split(',') : [];

    const recommendation = await getRecommendation(      
      format,
      pages,
      genresArray,
      author_nationality
    );

    return res.status(200).json(recommendation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = handleRecommendation;
