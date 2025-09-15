const express = require("express");
const router = express.Router();
const {ensureauthenticated,ensureManager} = require('../middleware/auth');

// Getting the stock
const recordstockModel = require("../models/recordstockModel");

router.get("/recordstock", ensureManager, (req, res) => {
  res.render("recordstock"); // Express will look for recordstock.pug
});

router.post("/recordstock",ensureManager, async (req, res) => {
  try {
    const stock = new recordstockModel(req.body);
    console.log(req.body);
    await stock.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
});
// getting stock from the database

router.get("/stocklist", async (req, res) => {
  try {
    let items = await recordstockModel.find().sort({ $natural: -1 });
    res.render("stocktable", {items});
  } catch (error) {
    res.status(400).send("Unable to get data from the database.");
  }
});

// Update stock item
// Show edit form for a stock item
router.get("/edit-stock/:id", async (req, res) => {
  try {
    const item = await Stock.findById(req.params.id);
    if (!item) return res.status(404).send("Stock item not found");
    res.render("editstock", {item}); // this Pug file must exist
  } catch (err) {
    res.status(500).send("Error loading stock item");
  }
});

router.put("/edit-stock/:id", async (req, res) => {
  try {
    const { customerName, productName, quantity, pricePerItem, salesAgent, salesDate } = req.body;

    await Stock.findByIdAndUpdate(req.params.id, {
      customerName,
      productName,
      quantity,
      pricePerItem,
      salesAgent,
      salesDate,
      update,
    });
    res.redirect("/stocklist");
  } catch (error) {
    res.status(500).send("Error updating stock item");
  }
});

router.post('/deletestock', async (req,res) => {
  try {
    await stockModel.deleteOne({_id:req.body.id});
    res.redirect('/stocklist')
  } catch (error) {
    res.status(400).send('Unable to delete item from the database.')
  }
} )


module.exports = router;
