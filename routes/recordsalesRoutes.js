const express = require('express');
const router = express.Router();

// Getting the stock
router.get("/recordsales", (req, res) => {
  res.render("recordsales"); // Express will look for recordstock.pug
});

router.post('/recordsales', (req, res) => {
    console.log(req.body);
});


module.exports = router; 
