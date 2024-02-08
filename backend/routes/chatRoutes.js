const express = require('express')
const { accessChat, fetchChats , deleteChats } = require('../controllers/chatController');
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").post(protect , accessChat);
router.route("/").get(protect, fetchChats);
router.route("/").delete(protect, deleteChats);

module.exports = router;