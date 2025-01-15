const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Groceries', 
      'Foodstuffs', 
      'Health and Personal Care', 
      'Home and Household Essentials', 
      'Electronics and Entertainment', 
      'Clothing and Accessories', 
      'Miscellaneous'
    ] // Restrict category to specific values
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  imageUrl: {
    type: String
    // You may consider adding a URL validator or specifying allowed file types if using local storage
  }
}, {
  timestamps: true // Mongoose will manage `createdAt` and `updatedAt`
});

module.exports = mongoose.model('Product', productSchema);
