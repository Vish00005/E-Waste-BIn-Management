require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const path = require("path");

app.use(express.static("../assets"));

const PORT = 3001;

// EJS setup (Frontened as views)
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "../Frontened"));

// Static files (CSS/JS/images)
app.use(express.static(path.join(process.cwd(), "../Frontened")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let mongouser = process.env.MONGO_DB_USER;
let mongopass = process.env.MONGO_DB_PASS;
mongoose
  .connect(
    `mongodb+srv://${mongouser}:${mongopass}@e-waste.boytdoj.mongodb.net/App?appName=E-waste`
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(" Mongo Error:", err.message));

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Sample route
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
  });

app.post("/signup", async (req,res)=>{
    let data = req.body;
    await User.insertOne({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        phone: data.phone,
    })
   
    res.send("signup");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/login", async (req, res) => {
    let data = req.body;
    let user = await User.findOne({
        email: data.email,
        password: data.password,
    });
    if (user) {
        res.send("Login Successful");
    } else {
        res.send("Invalid Credentials");
    }
});
