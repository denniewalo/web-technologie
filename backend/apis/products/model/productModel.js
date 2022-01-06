// productModel.js
const mongoose = require('mongoose');
// Setup schema
const productSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  }
});
// Export Product model
const Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
  Product.find(callback).limit(limit);
}
