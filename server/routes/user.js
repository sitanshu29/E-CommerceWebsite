const express = require("express");

const router = express.Router();

//import middleware
const { authCheck } = require("../middlewares/auth");

//controllers
const { userCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder, orders,
    addToWishlist, wishlist, removeFromWishlist }
    = require("../controllers/user");

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);

//order
router.post("/user/order", authCheck, createOrder);
router.get("/user/orders", authCheck, orders);


//wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;