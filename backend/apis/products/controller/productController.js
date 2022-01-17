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
exports.new = async function (req, res) {
  const product = new Product();
  product.id = req.body.id;
  product.name = req.body.name;
  product.price = req.body.price;
  product.imageURL = req.body.imageURL;
  // save image
  try {
    if(!req.files) {
     console.log("no file");
    } else {
      //Use the name of the input field (i.e. "productImage") to retrieve the uploaded file
      let productImage = req.files.productImage;
      //mv saves the images in a specific folder
      productImage.mv('./../../../frontend/images/' + productImage.name);
    }
  } catch (err) {
    console.log(err)
  }
// save the product and check for errors
  await product.save(function (err) {
    res.json({
      message: 'New product created!',
      data: product
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

exports.image = async function (req, res) {
  try {
    if(!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let productImage = req.files.productImage;

      //mv saves the images in a specific folder
      productImage.mv('./../../../frontend/images/' + productImage.name);

      //send response
      res.send({
        status: true,
        message: 'File is uploaded',
        data: {
          name: productImage.name,
          mimetype: productImage.mimetype,
          size: productImage.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
