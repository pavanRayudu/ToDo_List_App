const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("user Already Exists");
  }

  const user = await User.create({ username, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      todo: user.todo,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist && (await userExist.matchPassword(password))) {
    res.json({
      username: userExist.username,
      email: userExist.email,
      password: userExist.password,
      todo: userExist.todo,
      token: generateToken(userExist._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const UserPage = asyncHandler(async (req, res) => {
  const { todo, email } = req.body;
  const userExist = await User.findOne({email})
  const user = await User.updateOne(
    { email: email },
    {
      $push: { todo: { desc: todo, status: "NC" } },
    }
  );
  
});

module.exports = { registerUser, loginUser, UserPage };
