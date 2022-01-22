Order = require('./../model/orderModel');

//view Orders
exports.view = function (req, res) {
    console.log(req.params.customerId+ "IST DAS WAS?")
    Order.findById(req.params.customerId, function (err, orders) {
      if (err)
        res.send(err);
      res.json({
        message: 'Orders details loading..',
        data: orders
      });
    });
  };