const registerSuccessfulPayment = require('../../controllers/payment/registerSuccessfulPayment');

const handleSuccessfulPayment = async (req, res) => {
  try {
    console.log(req.query);
    const result = await registerSuccessfulPayment(req.query);
    if (result.success) res.send(result.message);
  } catch (error) {
    res.status(500).send(result.error);
  }
};

module.exports = handleSuccessfulPayment;
