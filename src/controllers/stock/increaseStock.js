const { SaleStock } = require('../../models');

const increaseStock = async (book_format_interm_id, quantity) => {
  try {

    let saleStock = await SaleStock.findOne({
      where: {        
        book_format_interm_id: book_format_interm_id,
      },
    });

    if (!saleStock) {
      saleStock = await SaleStock.create({
        book_format_interm_id: book_format_interm_id,
        stock: 0,
      });
    }

    await saleStock.increment('stock', { by: quantity });

    return { success: true, message: 'Stock actualizado correctamente' };

  } catch (error) {
    
    console.error('Error al aumentar el stock:', error);

    return { success: false, error: 'Error al aumentar el stock' };
  }
};

module.exports = increaseStock;
