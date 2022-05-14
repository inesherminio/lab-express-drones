const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

/* Good job in defining the prefix, however you had already declared the drones routes' file in app.js.
You must either declare it in app.js or here, but not on both places */
/* router.use("/drones", require('./drones')); */

module.exports = router;
