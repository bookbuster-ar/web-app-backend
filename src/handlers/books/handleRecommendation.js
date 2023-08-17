const { getRecommendation } = require('../../controllers');
const handleRecommendation = async (req, res) => {
    try {
        

        const recommendation = await getRecommendation();
    } catch (error) {
        
    }
}

module.exports = handleRecommendation;