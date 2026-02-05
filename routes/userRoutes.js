const express = require("express");
const userRoutes = require("../controller/user.js");
const router = express.Router({ mergeParams: true });

router.get("/login", userRoutes.login);

router.post("/signup", userRoutes.postSignup);

router.post("/login", userRoutes.postLogin);

router.get("/logout", userRoutes.logout);

module.exports = router;
