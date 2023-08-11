const mercadopago = require('../../config/mercadopago');

const placeOrder = async (items) => {
  const itemIds = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    unit_price: item.price,
  }));
  let preference = {
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      currency_id: 'ARS',
      unit_price: item.price,
      condition: item.condition,
      description: item.description,
      picture_url: item.image,
    })),
    external_reference: JSON.stringify(itemIds),

    back_urls: {
      success: 'http://localhost:3001/api/payment/success',
      failure: 'http://localhost:3001/api/payment/failure',
      pending: 'http://localhost:3001/api/payment/pending',
    },
  };

  const response = await mercadopago.preferences.create(preference); //Esto crea la orden de compra con la info de preference

  return response;
};

module.exports = placeOrder;
