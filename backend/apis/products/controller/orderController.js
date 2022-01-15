Order = require('./../model/orderModel');

// Handle index actions
exports.index = function (req, res) {
    order.get(function (err, orders) {
      if (err) {
        res.json({
          status: "error",
          message: err,
        });
      }
      res.json({
        status: "success",
        message: "Orders retrieved successfully",
        data: orders
      });
    });
  };

// Handle create product actions
exports.new = function (req, res) {
    const order = new Order();
    order.orderId = req.body.orderId;
    order.customerId = "";
    order.products = req.body.products;
    order.price = req.body.price;
    order.status = req.body.status;
  // save the product and check for errors
    order.save(function (err) {
      res.json({
        message: 'New order created!',
        data: order
      });
    });
  };