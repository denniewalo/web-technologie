
const { findById, prependOnceListener } = require('../model/productModel');

Order = require('./../model/orderModel');

// Handle index actions
exports.index = function (req, res) {
    Order.get(function (err, orders) {
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

// Handle create order actions
exports.new = function (req, res) {
    console.log(req.body);
    const order = new Order();
    order.ordersId = Date.now();
    order.customerId = req.body.customerId;
    order.products = req.body.products;
    order.price = req.body.price;
    order.status = "In Bearbeitung";
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

//update status
exports.update =function(req,res){
Order.findById(req.body.orders_Id,async function (err,orders){
  console.log("Orders Objekt:"+orders);
  if(err){
    res.send(err)
  }else{
    orders.ordersId = orders.ordersId;
    orders.customerId = orders.customerId;
    orders.products = orders.products;
    orders.price = orders.price;
    orders.status = req.body.status;
    console.log(orders);
    await orders.save(function(err){
      if(err){
        res.json(err);
      }else{
        res.status(201).json({
          message: 'Order statis updated',
          data: orders
        });
      }
    });
  }
});
};

//view Orders
exports.view = function (req, res) {
  console.log(req.params.order_Id+ "IST DAS WAS?")
  Order.findById(req.params.order_Id, function (err, orders) {
    if (err)
      res.send(err);
    res.json({
      message: 'Orders details loading..',
      data: orders
    });
  });
};
