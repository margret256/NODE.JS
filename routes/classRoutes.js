const express = require("express");// These lines must exist here to do routing
const router = express.Router ();
// 5. Routes
// Syntax of a route
//app.METHOD(PATH, HANDLER)
// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());

//    // This function call tells that more processing is
//    // required for the current request and is in the next middleware
//    //function/route handler.
//    next();  
// });

//Simple request time logger for a specific route
router.use('/home', (req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});

router.get('/home', (req, res) => {
  res.send('Home Page');
});
// Routing 
// login from
router.get('/loginform', (req,res) => {
    res.sendFile(__dirname + "/html/form2.html")
});
router.post('/loginform', (req,res) => {
    console.log(req.body)
});

//signup form
router.post('/signup.html', (req,res) => {
    console.log('usercreated')
});
router.post('/signup.html', (req,res) => {
    console.log(req.body)
});

module.exports = router;