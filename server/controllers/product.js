const Product = require("../models/product");
const Slugify = require("slugify");
const User = require("../models/user");
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = Slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message
        });
    }
}

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate("category")
        .populate("subs")
        .sort([["createdAt", "desc"]])
        .exec();
    res.json(products);
}

exports.remove = async (req, res) => {
    try {
        let deleted = await Product.findOneAndDelete({ slug: req.params.slug, }).exec();
        res.json(deleted);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send("Product Deletion Failed");
    }
}

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate("category")
        .populate("subs")
        .exec();

    res.json(product);
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = Slugify(req.body.title);
        }

        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true }
        ).exec();

        res.json(updated);

    } catch (err) {
        console.log("Product Update Error ------------>", err);
        return res.status(400).send("Product Update Failed");
    }
}

exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currPage = page || 1;
        const perPage = 3;
        const products = await Product.find({})
            .skip((currPage - 1) * perPage)
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products);
    }
    catch (err) {
        console.log(err);
    }
}

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);

}


exports.productStar = async (req, res) => {


    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body;

    //check if currently logged in user has already added rating to the product
    let exsistingRatingObject = product.ratings.find((e) =>
        e.postedBy.toString() === user._id.toString()
    );

    //if user haven't left ratings yet
    if (exsistingRatingObject === undefined) {
        console.log("herer");
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } }
            },
            { new: true }
        ).exec();
        console.log("Rating Added ", ratingAdded);
        res.json(ratingAdded);
    }
    else {
        //if user has already posted a rating, Update it
        const ratingUpdated = await Product.updateOne({
            ratings: { $elemMatch: exsistingRatingObject }
        },
            {
                $set: { "ratings.$.star": star }
            },
            { new: true }
        ).exec();
        console.log("Rating Updated", ratingUpdated);
        res.json(ratingUpdated);
    }
}

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category,
    })
        .limit(3)
        .populate("category")
        .populate("subs")
        .populate("postedBy")
        .exec();

    res.json(related);
}
//Search Filtering

const handleQuery = async (req, res, query) => {
    const products = await Product.find({ $text: { $search: query } })
        .populate("category", "_id name")
        .populate("subs", "_id name")
        .populate("postedBy", "_id name")
        .exec();

    res.json(products);
}

exports.searchFilters = async (req, res) => {
    const { query } = req.body;

    if (query) {
        await handleQuery(req, res, query);
    }
}