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
    next();
  });

const isAuthenticated = (req, res, next) => {
    if (req.cookies.username) {
      return next();
    }
    req.session.redirectTo = req.originalUrl;
  res.redirect("/login");
  };

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
    const auth = await bcrypt.compare(req.body.password,user.password);
    if (auth) {
        res.cookie("username", user.firstname, {
            httpOnly: true,        // cannot be accessed by JS
            maxAge: 3 * 60 * 60 * 1000 // 3 days
          });

          const redirectPath = req.session.redirectTo || "/";
          delete req.session.redirectTo;
          res.redirect(redirectPath);
    } else {
      
        req.flash("error", "Password Incorrect");
        res.redirect('/login');
    }
  } else {
    req.flash("error", "User Not Found");
    res.redirect('/login');
  }
});

app.get("/profile", isAuthenticated, (req, res) => {
    let userdata = User.findOne({firstname: res.locals.username});
    res.render("profile",{userdata});
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

  app.get("/findBin",(req,res)=>{
    res.render("find-bin");
  });

  app.get("/scan",(req,res)=>{
    res.render("scan");
  });

  app.get("/about",(req,res)=>{
    res.render("about");
  });

