const { getPriceByFormat } = require('../../controllers');

const handleGetPriceByFormat = async (req, res) => {
    try {

        const publishedBookId = req.query.id;
        const format = req.query.format;
        
        const priceByFormat = await getPriceByFormat(publishedBookId,format);

        if(!priceByFormat){
            return res.status(404).json({ message: 'No se encontraron resultados' });
        }else {
            return res.status(200).json(priceByFormat);
        };

    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}

module.exports = handleGetPriceByFormat