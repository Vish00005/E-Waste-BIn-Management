const express = require("express");
const isAuthenticated = require("../utils/isAuntheticated.js");
const upload = require("../cloudConfig");
const webRoutes = require("../controller/web.js")
const router = express.Router({ mergeParams: true });

router.get("/", webRoutes.homeRoute);

router.get("/profile", isAuthenticated, webRoutes.profile);

router.get("/rewards", isAuthenticated, webRoutes.rewards);

router.get("/dashboard", isAuthenticated, webRoutes.dashboard);

router.get("/findBin", webRoutes.findBin );

router.get("/about", webRoutes.about);

router.get("/recycle", isAuthenticated, webRoutes.getRecycle);

router.get("/otp", webRoutes.otp );

router.post(
  "/recycle",
  isAuthenticated,
  upload.single("image"),
  webRoutes.postRecycle
);

router.post("/recycle/verify-otp", isAuthenticated, webRoutes.verifyOtp);


module.exports = router;
