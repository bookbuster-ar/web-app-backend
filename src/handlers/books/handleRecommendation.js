const { getRecommendation } = require('../../controllers');
const handleRecommendation = async (req, res) => {
    try {
        const format = req.query.format;
        const pages = req.query.pages;
        const genres = req.query.genres;        

        const recommendation = await getRecommendation(format, pages, genres);

        return res.status(200).json(recommendation);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = handleRecommendation;