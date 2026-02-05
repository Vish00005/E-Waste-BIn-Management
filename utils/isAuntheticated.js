const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      req.session.redirectTo = req.originalUrl;
      return res.redirect("/user/login");
    }

    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie("userId");
      return res.redirect("/user/login");
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.clearCookie("userId");
    return res.redirect("/user/login");
  }
};

module.exports = isAuthenticated;