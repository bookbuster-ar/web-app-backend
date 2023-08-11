const { SaleStock } = require('../../models');

const increaseStock = async (bookId, quantity) => {
  try {
    let saleStock = await SaleStock.findOne({
      where: { published_book_id: bookId },
    });

    if (!saleStock) {
      saleStock = await SaleStock.create({
        published_book_id: bookId,
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
