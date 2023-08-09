const handleSuccessfulPayment = async(req, res) => {

    try{
      
    console.log(req.query);
    const result = await registerOrder(req.query);

    res.send('pago con exito');
    }catch(error){
      res.status(500).json({error: error.message});
    }
  };
  
  module.exports = handleSuccessfulPayment;