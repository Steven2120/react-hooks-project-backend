var express = require("express");
var router = express.Router();
var { createUser, login, deleteUser } = require("./controller/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", createUser);

router.post("/login", login);

router.get("/logout", function (req, res) {
  res.clearCookie("jwt-cookie");
  res.send("logged out");
});

module.exports = router;
