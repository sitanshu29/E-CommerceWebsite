const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

//route
router.post('/create-or-update-user', authCheck, createOrUpdateUser);
router.post('/current-user', authCheck, currentUser);
router.post('/current-admin', authCheck, checkAdmin, currentUser);

module.exports = router;