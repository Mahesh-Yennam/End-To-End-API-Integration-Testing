const router = require("express").Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.post("/", createUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
