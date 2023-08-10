const handlePendingPayment = (req, res) => {
  console.log(req.query);
  res.send('Pago pendiente');
};

module.exports = handlePendingPayment;
