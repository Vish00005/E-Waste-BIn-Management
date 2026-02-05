require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const path = require("path");

const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

const upload = require("./cloudConfig");

app.use(express.static("../assets"));

const PORT = 3001;

// EJS setup (Frontened as views)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "../Frontened"));

// Static files (CSS/JS/images)
app.use(express.static(path.join(process.cwd(), "../Frontened")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

let mongouser = process.env.MONGO_DB_USER;
let mongopass = process.env.MONGO_DB_PASS;
mongoose
  .connect(
    `mongodb+srv://${mongouser}:${mongopass}@e-waste.boytdoj.mongodb.net/App?appName=E-waste`
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(" Mongo Error:", err.message));

// Middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.locals.username = req.cookies.username;
  res.locals.userid = req.cookies.userId;
  next();
});

const isAuthenticated = async (req, res, next) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      req.session.redirectTo = req.originalUrl;
      return res.redirect("/login");
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user; 
    return next();   
  } catch (err) {
    console.error(err);
    return res.redirect("/login");
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
async function sendOTP(email, otp) {
  await transporter.sendMail({
    from: `"E-Waste Management" <${process.env.EMAIL}>`,
    to: email,
    subject: "Your Recycling OTP",
    html: `
        <h3>OTP Verification</h3>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>Valid for 5 minutes</p>
      `,
  });
}

// Sample route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  let data = req.body;
  await User.insertOne({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
    phone: data.phone,
  });

  res.redirect("/login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/login", async (req, res) => {
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
        maxAge: 3 * 60 * 60 * 1000 // 3 hours
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
});

app.get("/profile", isAuthenticated, (req, res) => {
  res.render("profile", {
    userdata: req.user
  });
});

app.get("/rewards", isAuthenticated, (req, res) => {
  res.render("rewards");
});

app.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard");
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
});

app.get("/findBin", (req, res) => {
  res.render("find-bin");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/recycle", isAuthenticated, (req, res) => {
  res.render("recycle");
});

app.get("/otp",(req,res)=>{
  res.render("otp");
})
app.post(
  "/recycle",
  isAuthenticated,
  upload.single("image"),
  async (req, res) => {
    function generateOTP() {
      
      return Math.floor(100000 + Math.random() * 900000).toString();
    }

    console.log(req.user);
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
        itemName:req.body.itemName,
        category: req.body.type,          // mobile, laptop, tv, etc
        quantity: Number(req.body.quantity),
        estimatedPrice: req.body.price,            // calculated on backend
        pointsEarned: req.body.points,              // calculated on backend
        condition: req.body.condition,    // working, damaged, dead
        usagePeriod: req.body.usage,      // 1>, 1-3, >3
        imageUrl: req.file.path            // Cloudinary URL
      };


      await sendOTP(user.email, otp);

      console.log("File uploaded to Cloudinary:", req.file.path);
      res.redirect("otp")
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }
);

app.post("/recycle/verify-otp", isAuthenticated, async (req, res) => {
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

  res.redirect("/")
});

  app.post(
    "/recycle",
    upload.single("image"),
    (req, res) => {
      // Access the uploaded file via req.file
      console.log("File uploaded to Cloudinary:", req.file.path);
      res.send("File uploaded successfully!");
    } 
  );

