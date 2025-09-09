const express = require('express');
const router = express.Router();

// Getting the stock
router.get("/recordsales", (req, res) => {
  res.render("recordsales"); // Express will look for recordstock.pug
});

router.post('/recordsales', async (req, res) => {
  try {
    const stock = new recordsalesModel(req.body)
    console.log(req.body);
    await stock.save()
    res.redirect("/dashbord")
  } catch (error) {
    console.error(error)
    res.redirect("/login")
  }
});


module.exports = router; 
