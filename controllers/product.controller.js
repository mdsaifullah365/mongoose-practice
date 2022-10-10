const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductsService,
  deleteProductByIdService,
  bulkDeleteProductsService,
  validateIdService,
} = require('../services/product.service');

exports.getProducts = async (req, res) => {
  try {
    let filters = { ...req.query };

    const excludedFields = ['limit', 'sort', 'fields', 'page'];
    excludedFields.forEach((field) => {
      delete filters[field];
    });

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|lt|gte|lte|ne)\b/g, // \b is for boundary. Meaning: Only words start and end with gt,lt,gte,lte or ne will match.
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);

    const queries = {};

    if (req.query.sort) {
      queries.sortBy = req.query.sort.split(',').join(' ');
    }

    if (req.query.fields) {
      queries.fields = req.query.fields.split(',').join(' ');
    }

    if (req.query.limit) {
      queries.limit = +req.query.limit;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;

      queries.skip = (page - 1) * limit;
      queries.limit = +limit;
    }

    const result = await getProductsService(filters, queries);

    res.status(400).json({
      success: true,
      message: 'Data loaded successfully',
      total: result.total,
      page: result.page,
      data: result.products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
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
      error: error.message,
    });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isIdValid = validateIdService(id);

    if (!isIdValid) {
      return res.status(400).json({
        success: false,
        message: 'Product Id is invalid',
      });
    }

    const result = await updateProductByIdService(id, req.body);

    if (!result.matchedCount) {
      return res.status(400).json({
        success: false,
        message: 'Product Id not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Data updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Data is not updated',
      error: error.message,
    });
  }
};

exports.bulkUpdateProducts = async (req, res) => {
  try {
    const result = await bulkUpdateProductsService(req.body);

    res.status(200).send({
      success: true,
      message: 'Data updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Data is not updated',
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const isIdValid = validateIdService(id);

    if (!isIdValid) {
      return res.status(400).json({
        success: false,
        message: 'Product Id is invalid',
      });
    }

    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        success: false,
        message: 'Product Id not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Data deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Data is not deleted',
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res) => {
  try {
    const result = await bulkDeleteProductsService(req.body.ids);

    res.status(200).send({
      success: true,
      message: 'Data deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Data is not deleted',
      error: error.message,
    });
  }
};
