const Product = require('../models/Product');

module.exports.getProductsService = async () => {
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
    .find({});

  return products;
};

module.exports.createProductService = async (data) => {
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
