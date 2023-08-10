const handleFailurePayment = (req, res) => {
  console.log(req.query);
  res.send('Pago rechazado');
};

module.exports = handleFailurePayment;
