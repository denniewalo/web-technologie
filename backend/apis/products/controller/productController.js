Product = require('./../model/productModel');

// Handle index actions
exports.index = function (req, res) {
  Product.get(function (err, products) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Products retrieved successfully",
      data: products
    });
  });
};

// Handle create product actions
exports.new = function (req, res) {
  const product = new Product();
  product.id = req.body.id;
  product.name = req.body.name;
  product.price = req.body.price;
  product.imageURL = req.body.imageURL;
// save the product and check for errors
  product.save(function (err) {
    if(err) {
      res.json(err);
    } else {
      res.status(201).json({
        message: 'New product created!',
        data: product
      });
    }
  });
};
// Handle view product info
exports.view = function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
    if (err)
      res.send(err);
    res.json({
      message: 'Product details loading..',
      data: product
    });
  });
};
// Handle update product info
exports.update = function (req, res) {
  Product.findById(req.params.product_id, function (err, product) {
    if (err) {
      res.send(err);
    }else {
      product.id = req.body.id;
      product.name = req.body.name;
      product.price = req.body.price;
      product.imageURL = req.body.imageURL;
// save the product and check for errors
      product.save(function (err) {
        if (err) {
          res.json(err);
        } else {
          res.status(201).json({
            message: 'Product Info updated',
            data: product
          });
        }
      });
    }
  });
};

// Handle delete product
exports.delete = function (req, res) {
  Product.deleteOne({
    _id: req.params.product_id
  }, function (err, contact) {
    if (err) {
      res.send(err);
      return;
    }
    res.json({
      status: "success",
      message: 'Product deleted'
    });
  });
};
