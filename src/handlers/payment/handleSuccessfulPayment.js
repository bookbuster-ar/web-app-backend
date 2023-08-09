const handleSuccessfulPayment = (req, res) => {
    console.log(req.query);
    res.send('pago con exito');
  };
  
  module.exports = handleSuccessfulPayment;