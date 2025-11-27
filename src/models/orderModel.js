const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: String,
  orderPrice: Number,
  orderDate: Date,
});

module.exports = mongoose.model("order", orderSchema);