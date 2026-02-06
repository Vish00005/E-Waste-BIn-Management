
const User = require("../models/userModel");
const sendOTP = require("../utils/sendOtp")

//--------------------------Home--------------------------
 module.exports.homeRoute = (req, res,next) => {
   try {
    res.render("index");
   } catch (err) {
    err.status = 500;
    next(err);
   }
    
  }

//--------------------------Profile--------------------------
module.exports.profile = (req, res,next) => {
    try {
      res.render("profile", {
        userdata: req.user,
      });
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }

//--------------------------Rewards--------------------------
module.exports.rewards = (req, res,next) => {
    try {
      res.render("rewards", {
        userdata: req.user,
      });
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }

//--------------------------DashBoard--------------------------
  module.exports.dashboard = (req, res,next) => {
   try {
    res.render("dashboard", {
      userdata: req.user,
    });
   } catch (err) {
    err.status = 500;
      next(err);
   }
  }

  //--------------------------Find-BIn--------------------------
  module.exports.findBin = (req, res,next) => {
    try {
      res.render("find-bin");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }

  //--------------------------About--------------------------
  module.exports.about = (req, res,next) => {
   try {
    res.render("about");
   } catch (err) {
    err.status = 500;
      next(err);
   }
  }

  //--------------------------REcycle Get--------------------------
  module.exports.getRecycle =(req, res,next) => {
    try {
      res.render("recycle");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }

  //--------------------------OTP--------------------------
  module.exports.otp =(req, res,next) => {
    try {
      res.render("otp");
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }
  //--------------------------Recycle Post--------------------------
  module.exports.postRecycle = async (req, res,next) => {
    try {
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
    } catch (err) {
      err.status = 500;
      next(err);
    }
  }

  //--------------------------Verify OTP--------------------------
  module.exports.verifyOtp = async (req, res,next) => {
    try {
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
  
    } catch (err) {
      err.status = 500;
      next(err);
    }}