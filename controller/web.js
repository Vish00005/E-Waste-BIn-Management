
const User = require("../models/userModel");
const sendOTP = require("../utils/sendOtp")

//--------------------------Home--------------------------
 module.exports.homeRoute = (req, res) => {
    res.render("index");
  }

//--------------------------Profile--------------------------
module.exports.profile = (req, res) => {
    res.render("profile", {
      userdata: req.user,
    });
  }

//--------------------------Rewards--------------------------
module.exports.rewards = (req, res) => {
    res.render("rewards", {
      userdata: req.user,
    });
  }

//--------------------------DashBoard--------------------------
  module.exports.dashboard = (req, res) => {
    res.render("dashboard", {
      userdata: req.user,
    });
  }

  //--------------------------Find-BIn--------------------------
  module.exports.findBin = (req, res) => {
    res.render("find-bin");
  }

  //--------------------------About--------------------------
  module.exports.about = (req, res) => {
    res.render("about");
  }

  //--------------------------REcycle Get--------------------------
  module.exports.getRecycle =(req, res) => {
    res.render("recycle");
  }

  //--------------------------OTP--------------------------
  module.exports.otp =(req, res) => {
    res.render("otp");
  }
  //--------------------------Recycle Post--------------------------
  module.exports.postRecycle = async (req, res) => {
    function generateOTP() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      const otp = generateOTP();

      user.otp = otp;
      user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
      await user.save();

      req.session.recycleData = {
        itemName: req.body.itemName,
        category: req.body.type, // mobile, laptop, tv, etc
        quantity: Number(req.body.quantity),
        estimatedPrice: req.body.price, // calculated on backend
        pointsEarned: req.body.points, // calculated on backend
        condition: req.body.condition, // working, damaged, dead
        usagePeriod: req.body.usage, // 1>, 1-3, >3
        imageUrl: req.file.path, // Cloudinary URL
      };

      await sendOTP(user.email, otp);


      res.redirect("otp");
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong:",err);
    }
  }

  //--------------------------Verify OTP--------------------------
  module.exports.verifyOtp = async (req, res) => {
    const { otp } = req.body;
    const user = await User.findById(req.user.id);
  
    if (!user || user.otp !== otp || user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
  
    user.recycledItems.push(req.session.recycleData);
  
    await user.save();
  
    user.otp = undefined;
    user.otpExpiresAt = undefined;
  
    req.session.recycleData = null;
  
    res.redirect("/rewards");
  }