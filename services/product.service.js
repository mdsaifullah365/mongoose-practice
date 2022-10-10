const { isValidObjectId } = require('mongoose');
const Product = require('../models/Product');

exports.validateIdService = (id) => {
  return isValidObjectId(id);
};

exports.getProductsService = async (filters, queries) => {
  const { skip, limit, fields, sortBy } = queries;

  const products = await Product
    // .find(
    //   {
    //     $or: [{ name: 'T-shirt' }, { quantity: 0 }],
    //   },
    //   'name price'
    // )
    // .select({ quantity: 1 })

    // Or
    // .where('name')
    // .equals('T-shirt')
    // .where('price')
    // .gt(300)
    // .limit(3);

    // Or
    // .findOne({ _id: '633430f0564cff8c713dfad4' });

    //Or
    // .findById('633430f0564cff8c713dfad4');
    .find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields)
    .sort(sortBy);

  const total = await Product.countDocuments(filters);
  const page = skip >= 0 ? Math.ceil(total / limit) : null;
  return { total, page, products };
};

exports.createProductService = async (data) => {
  // Save (Create instance => modify => save)

  // const product = new Product(req.body);
  // if (product.quantity === 0) {
  //   product.status = 'out-of-stock';
  // }
  // const result = await product.save();

  //Create

  const product = await Product.create(data);

  return product;
};

exports.updateProductByIdService = async (productId, data) => {
  const result = await Product.updateOne(
    { _id: productId },
    { $set: data },
    {
      runValidators: true,
    }
  );
  // const product = await Product.findById(productId);

  // const result = product.set(data).save();

  return result;
};

exports.bulkUpdateProductsService = async (data) => {
  // const product = await Product.updateMany({ _id: data.ids }, data.data, {
  //   runValidators: true,
  // });
  const products = [];

  data.forEach((product) => {
    products.push(
      Product.updateOne({ _id: product.id }, product.data, {
        runValidators: true,
      })
    );
  });

  const result = await Promise.all(products);

  return result;
};

exports.deleteProductByIdService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });

  return result;
};

exports.bulkDeleteProductsService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
