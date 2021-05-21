const express = require("express");

// Goi controller
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController");
const FanpageController = require("../controllers/FanpageController");
const ConversationController = require("../controllers/ConversationController");
const PostController = require("../controllers/PostController");

var router = express.Router();

// Home
router.get("/", HomeController.index);

// User
router.get("/users/", UserController.index);
router.get("/users/detail/:id", UserController.get);
router.delete("/users/del/:id", UserController.del);
router.put("/users/update/", UserController.update);
router.post("/users/add", UserController.save);

//Fanpage
router.get("/fanpages", FanpageController.index);
router.get("/fanpages/login-page/:id", FanpageController.loginPage);
router.post("/fanpages/search/", FanpageController.search);
router.post("/fanpages/add", FanpageController.save);
router.delete("/fanpages/delete/:id", FanpageController.destroy);

//Conversation
router.get("/conversations/:id", ConversationController.index);
router.post("/conversations/detail/", ConversationController.get);
router.post("/conversations/chat/", ConversationController.chat);

//Post
router.get("/posts/:id", PostController.index);
router.post("/posts/add", PostController.index);

module.exports = router;
