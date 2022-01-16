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
    console.log(req.body);
    const order = new Order();
    order.ordersId = req.body.ordersid;
    order.customerId = "2";
    order.products = req.body.products;
    order.price = req.body.price;
    order.status = req.body.status;
  // save the product and check for errors
  console.log(order);
    order.save(function (err) {
      if(err){console.log(err)}
      res.json({
        message: 'New order created!',
        data: order
      });
    });
  };