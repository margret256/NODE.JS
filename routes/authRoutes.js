const express = require('express');
const router = express.Router();

const UserModel = require("../models/userModel")
// Getting the signup form
router.get('/signup', (req, res) => {
    res.render("signup", { title: 'signup form' });
});

router.post('/signup', (req, res) => { 
    const user = new UserModel(req.body)
    console.log(req.body);
    user.save()
    res.redirect('/login')
});

router.get('/login', (req, res) => {
    res.render("login", { title: 'login form' });
});

router.post('/login', (req, res) => {
    console.log(req.body);
    res.redirect('/recordstock')
});

module.exports = router; 
