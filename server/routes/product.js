const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { create, listAll, remove, read, update, list, productsCount, productStar
    , listRelated, searchFilters } = require("../controllers/product");

//route
router.post('/product', authCheck, checkAdmin, create);
router.get("/products/total", productsCount);
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, checkAdmin, remove);
router.get('/product/:slug', read);
router.put("/product/:slug", authCheck, checkAdmin, update);
router.post("/products", list);

//Rating
router.put("/product/star/:productId", authCheck, productStar);

//Related
router.get("/product/related/:productId", listRelated);

//search
router.post("/search/filters", searchFilters);

module.exports = router;