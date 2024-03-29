const express = require('express')
const { sendMessage , allMessage } = require("../controllers/messageControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route('/').post(protect , sendMessage);
router.route('/:chatId').get(protect , allMessage);

module.exports = router;