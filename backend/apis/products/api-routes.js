const router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API is Working',
    message: 'Welcome to the ProductAPI!',
  });
});

// Import product controller
const productController = require('./controller/productController');
const orderController = require('./controller/orderController');

// Product routes
router.route('/products')
  .get(productController.index)
  .post(productController.new);
router.route('/products/:product_id')
  .get(productController.view)
  .patch(productController.update)
  .put(productController.update)
  .delete(productController.delete);

  // Order routes
router.route('/orders')
  .get(orderController.index)
  .post(orderController.new)

router.route('/orders/update-status')
  .get(orderController.view)
  .patch(orderController.update)

router.route('/orders/getByID/:order_Id')
  .get(orderController.view)

  



// Export API routes
module.exports = router;
