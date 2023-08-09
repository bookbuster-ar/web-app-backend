const { loginLocal } = require('../../controllers/index');

const handleLoginLocal = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginLocal({ email, password });
    res.status(200).json(token);
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

module.exports = handleLoginLocal;
