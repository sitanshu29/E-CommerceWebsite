const express = require("express");

const router = express.Router();

//import middleware
const { authCheck } = require("../middlewares/auth");

//controllers
const { userCart } = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);

module.exports = router;