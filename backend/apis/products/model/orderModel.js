const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    ordersId: {
        type: String,
        required:  true
    },
    customerId: {
        type: String,
        required: true
    },
    products: [String],
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});
const Order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
  Order.find(callback).limit(limit);
}