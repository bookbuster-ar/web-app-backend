const { registerSuccessfulPayment } = require('../../controllers');

const handleSuccessfulPayment = async (req, res) => {
  const { payment_id, status, payment_type, external_reference } = req.query;
  try {
    const paymentInfo = {
      payment_id,
      status,
      payment_type,
      external_reference,
    };
    const result = await registerSuccessfulPayment(paymentInfo);
    if (result.success) res.redirect('https://bookbuster-deploy.vercel.app');
  } catch (error) {
    console.error(error);
    res.status(500).send(result.error);
  }
};

module.exports = handleSuccessfulPayment;
