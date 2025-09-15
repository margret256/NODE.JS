const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserModel = require("../models/userModel");
// const RecordstockModel = require("../models/recordstockModel")
// Getting the signup form
// signup route
router.get("/signup", (req, res) => {
  res.render("signup", { title: "signup form" });
});
router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password, phonenumber, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }
    UserModel.register(
      new UserModel({ fullname, email, phonenumber, role }),
      password,
      (error, user) => {
        if (error) {
          console.error("Error registering user:", error);
          return res.status(400).send("Error registering user");
        }
        res.redirect("/login");
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    res.status(400).send("Try again");
  }
});

// login router
router.get("/login", (req, res) => {
  res.render("login", { title: "login form" });
});
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role === "manager") {
      res.redirect("/recordstock");
    } else if (req.user.role === "sales Agent") {
      res.redirect("recordstock");
    } else res.render("recordstock");
  }
);

// logout route
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send("error logging out");
      }
      res.redirect("/dashboard");
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    let users = await UserModel.find().sort({ $natural: -1 });
    res.render("usertable", {users});
  } catch (error) {
    res.status(400).send("Unable to get users from the database.");
  }
});

module.exports = router;
