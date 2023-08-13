const getPaginationData = (req, defaultLimit = 15) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || defaultLimit;
    const offset = (page - 1) * limit;

    return { page, limit, offset };
        
}

module.exports = getPaginationData;