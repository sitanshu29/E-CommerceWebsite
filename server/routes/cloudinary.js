const express = require("express");

const router = express.Router();

//import middleware
const { authCheck, checkAdmin } = require("../middlewares/auth");

//import
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, checkAdmin, upload);
router.post("/removeimage", authCheck, checkAdmin, remove);

module.exports = router;