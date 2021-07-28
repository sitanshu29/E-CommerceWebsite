const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { create, read, remove, update, list, getSubs } = require("../controllers/category");

//route
router.post('/category', authCheck, checkAdmin, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, checkAdmin, update);
router.delete('/category/:slug', authCheck, checkAdmin, remove);
router.get('/category/subs/:_id', getSubs);
module.exports = router;