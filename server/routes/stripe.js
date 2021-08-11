const express = require("express");

const router = express.Router();

//import middleware
const { authCheck } = require("../middlewares/auth");

//import
const { createPaymentIntent } = require("../controllers/stripe");

router.post("/create-payment-intent", authCheck, createPaymentIntent);


module.exports = router;