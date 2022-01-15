const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderId: {
        type: String,
        required = true
    },
    customerId: {
        type: String,
        required = true
    },
    products: {
        type: String,
        required = true
    },
    price: {
        type: String,
        required = true
    },
    status: {
        type: String,
        required = true
    }
});
const Order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
  Order.find(callback).limit(limit);
}