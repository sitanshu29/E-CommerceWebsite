const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");
const { orders, orderStatus } = require("../controllers/admin");

// routes
router.get("/admin/orders", authCheck, checkAdmin, orders);
router.put("/admin/order-status", authCheck, checkAdmin, orderStatus);

module.exports = router;
