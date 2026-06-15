const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name required",
    });
  }

  const user = await User.create({
    name: req.body.name,
  });

  res.status(201).json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();

  res.json(users);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
};
