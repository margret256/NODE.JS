const mongoose = require("mongoose");

const recordstockSchema = new mongoose.Schema({
  customerName: {
    type: String,
    // required: true,
  },
  productName: {
    type: String,
    // required: true,
  },
  quantity: {
    type: Number,
    // required: true,
  },
  pricePerItem: {
    type: Number,
    // required: true,
  },
  salesAgent: {
    type: String,
    // required: true,
  },
  salesDate: {
    type: Date,
    // required: true,
  },
});

module.exports = mongoose.model("StockModel", recordstockSchema);
