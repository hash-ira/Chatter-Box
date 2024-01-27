const express = require('express')
const {registerUser , authenticateUser , searchUsers} = require("../controllers/userControllers");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.route('/').post(registerUser);
router.route('/login').post(authenticateUser);
router.route('/').get( protect, searchUsers);

module.exports = router;