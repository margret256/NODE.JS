const express = require('express');
const router = express.Router();

// Getting the stock
router.get("/dashboard", (req, res) => {
  res.render("dashboard"); // Express will look for dashboard.pug
});

router.post('/dashboard', (req, res) => {
    console.log(req.body);
});


module.exports = router; 
