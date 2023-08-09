const mercadopago = require('../../config/mercadopago');
const { FE_URL } = require('../../utils/env');

const placeOrder = async (items) => {
  let preference = {
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      currency_id: 'ARS',
      unit_price: item.price,
      condition: item.condition,
      stock: item.stock,
      description: item.description,
      picture_url: item.image,
    })),
    back_urls: {
      success: FE_URL,
      failure: `${FE_URL}/payment/failure`,
      pending: `${FE_URL}/payment/pending`,
    },
  };

  const response = await mercadopago.preferences.create(preference); //Esto crea la orden de compra con la info de preference

  return response;
};

module.exports = placeOrder;
