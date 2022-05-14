// Routes are handled here, instead of server.js

const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));
/* Given that you do not have anything on your index view, it makes no sense to display it.
You are not obbliged to have an index view thus, in this case, you could directly display your /drones route, aka the list of drones.
It's basically your choice what to show to users and when */

router.use("/drones", require("./drones"));
/* Good job declaring a prefix to your drones' routes */

module.exports = router;
