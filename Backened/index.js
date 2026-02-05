require("dotenv").config({ path: "../.env" });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");

const PORT = 3001;

const userRoutes = require("./routes/userRoutes.js")
const webRoutes = require("./routes/webRoutes.js")

//--------------------------EJS setup (Frontened as views)--------------------------
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "../Frontened"));

//--------------------------Static files (CSS/JS/images)--------------------------
app.use(express.static("../assets"));
app.use(express.static(path.join(process.cwd(), "../Frontened")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());


//--------------------------Mongo Connection--------------------------
let mongouser = process.env.MONGO_DB_USER;
let mongopass = process.env.MONGO_DB_PASS;
mongoose
  .connect(
    `mongodb+srv://${mongouser}:${mongopass}@e-waste.boytdoj.mongodb.net/App?appName=E-waste`
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(" Mongo Error:", err.message));


//--------------------------Session--------------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


//--------------------------Port Listening--------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//--------------------------locals for flash--------------------------
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//--------------------------locals of user data--------------------------
app.use((req, res, next) => {
  res.locals.username = req.cookies.username;
  res.locals.userid = req.cookies.userId;
  next();
});

//--------------------------Webpages Routes--------------------------
app.use("/",webRoutes)

//--------------------------UserRoutes(login/signup)--------------------------
app.use("/user",userRoutes)