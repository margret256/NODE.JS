const express = require('express');
const router = express.Router();

// Getting the stock
const StockModel = require("../models/recordstockModel")

router.get("/recordstock", (req, res) => {
  res.render("recordstock"); // Express will look for recordstock.pug
});

router.post('/recordstock', async (req, res) => {
  try {
    const stock = new StockModel(req.body)
    console.log(req.body);
    await stock.save()
    res.redirect("/signup")
  } catch (error) {
    console.error(error)
    res.redirect("/recordstock")
  }
});


module.exports = router; 
