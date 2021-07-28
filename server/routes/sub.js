const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { create, read, remove, update, list } = require("../controllers/sub");

//route
router.post('/sub', authCheck, checkAdmin, create);
router.get('/subs', list);
router.get('/sub/:slug', read);
router.put('/sub/:slug', authCheck, checkAdmin, update);
router.delete('/sub/:slug', authCheck, checkAdmin, remove);

module.exports = router;