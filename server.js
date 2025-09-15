//1.Dependencies
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const passport = require("passport");
const expressSession = require('express-session')
const MongoStore =require('connect-mongo')
const moment =require('moment')
require('dotenv').config();

const UserModel = require("./models/userModel")
// import routes
const classRoutes = require("./routes/classRoutes");
const authRoutes =require('./routes/authRoutes');
const stockRoutes = require('./routes/recordstockRoutes');
const salesRoutes = require('./routes/recordsalesRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { Session } = require("inspector/promises");
// 2.Instantiations

const app = express();
const port = 3001; // you can change the port here always

// routing
// app.get('/', (req,res) => {
//     res.send('Homepage! Hello world.')
//     })
// 3. Configurations
app.locals.moment = moment;
// setting up mongodb connectons
mongoose.connect(process.env.MONGODB_URL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });
  // setting view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 4. Middleware
//middleware
// app.use(express.static('public'));// specifies where the static files are.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //helps to pass data from forms
// express session configs
app.use(expressSession({
  secret: process.env.Session_SECRET,
  resave:false,
  saveUninitialized:false,
  store:MongoStore.create({mongoUrl:process.env.MONGODB_URL}),
  cookie:{maxAge:24*60*60*1000} //oneday
}))
// passort configs 
app.use(passport.initialize());
app.use(passport.session())

// authenticate with passport local strategy
passport.use(UserModel.createStrategy());
passport.deserializeUser(UserModel.deserializeUser());
passport.serializeUser(UserModel.serializeUser());

app.get("/Margret", (req, res) => {
  res.send("That is my name");
});
app.post("/about", (req, res) => {
  res.send("About page! Nice.");
});

app.put("/user", (req, res) => {
  res.send("Got a PUT requset at /user");
});

app.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});
// path parameters and query strings
// pathparams
app.get("/pathparams/:username", (req, res) => {
  res.send("This is the username " + req.params.username);
});

//query strings
app.get("/students", (req, res) => {
  res.send(
    "This is " +
      req.query.name +
      " from cohort " +
      req.query.cohort +
      " class of " +
      req.query.class
  );
});
// 5. Route// routes come in as imports
// using imported routes
app.use("/", classRoutes);
app.use('/', authRoutes);
app.use('/', stockRoutes);
app.use('/', salesRoutes);
app.use('/', dashboardRoutes);










// Bootstrapping Server
// this should be always the last line in this file.
app.listen(port, () => console.log(`listening on port ${port}`));
