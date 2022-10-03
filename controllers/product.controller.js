const Product = require('../models/Product');
const {
  getProductsService,
  createProductService,
} = require('../services/product.service');

module.exports.getProducts = async (req, res) => {
  try {
    const result = await getProductsService();

    res.status(400).json({
      success: true,
      message: 'Data loaded successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body);

    res.status(200).send({
      success: true,
      message: 'Data inserted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Data is not inserted',
      error,
    });
  }
};
