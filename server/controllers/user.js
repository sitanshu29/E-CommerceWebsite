const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const product = require("../models/product");


exports.userCart = async (req, res) => {

    //console.log(req.body);

    const { cart } = req.body;
    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    //check cart with logged in user already exists
    let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("remove old Cart");
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        //get Price from db for calculating Total Price
        let { price } = await Product.findById(cart[i]._id).select("price").exec();
        object.price = price;

        products.push(object);

    }
    console.log("product", products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
        products,
        cartTotal,
        orderdBy: user._id,
    }).save();

    console.log("New Cart", newCart);
    res.json({ ok: true });

}
