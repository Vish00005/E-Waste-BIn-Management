const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

//--------------------------Login--------------------------
module.exports.login = (req, res) => {
  res.render("login");
};

//--------------------------SignUp Post--------------------------
module.exports.postSignup = async (req, res) => {
  let data = req.body;
  await User.insertOne({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
    phone: data.phone,
  });

  res.redirect("/user/login");
};

//--------------------------Login Post--------------------------
module.exports.postLogin = async (req, res) => {
  let data = req.body;
  let user = await User.findOne({
    email: data.email,
  });

  if (user) {
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (auth) {
      res.cookie("username", user.firstname, {
        httpOnly: true, // cannot be accessed by JS
        maxAge: 3 * 60 * 60 * 1000, // 3 days
      });
      res.cookie("userId", user._id.toString(), {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });

      const redirectPath = req.session.redirectTo || "/";
      delete req.session.redirectTo;
      res.redirect(redirectPath);
    } else {
      req.flash("error", "Password Incorrect");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "User Not Found");
    res.redirect("/login");
  }
};

//--------------------------Logout--------------------------
module.exports.logout = (req, res) => {
  res.clearCookie("username");
  res.clearCookie("userId");
  res.redirect("/");
};
