const express = require("express");
const UserController = require("../controllers/userContoller");
const authentication = require("../middlewares");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.patch("/subscribe", authentication, UserController.subscribe);
router.get("/verify/:uniqueString", UserController.verify);

module.exports = router;
