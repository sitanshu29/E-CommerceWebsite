const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { create, remove, list } = require("../controllers/coupon");

//route
router.post('/coupon', authCheck, checkAdmin, create);
router.get('/coupons', list);
router.delete('/coupon/:couponId', authCheck, checkAdmin, remove);

module.exports = router;