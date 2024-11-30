const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/errorHandler.js");
const User = require("../models/userModel.js");

function signToken(user, res) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user._doc.password;
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json({
      status: "success",
      user,
    });
}

exports.signUp = async function (req, res, next) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return next(
      errorHandler("Name,Email and Password all are required fields", 400)
    );
  }

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return next(errorHandler("User already exists with the same email", 404));
  }
  if (password.trim().length < 6) {
    return next(
      errorHandler("Password should be minimum 6 characters long", 400)
    );
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    email,
    fullName,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    signToken(newUser, res);
  } catch (error) {
    next(error);
  }
};

exports.signIn = async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler("Email and password are required", 400));
  }
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return next(errorHandler("No user found with the entered email", 400));
  }
  const isValidPassword = bcrypt.compareSync(password, foundUser.password);
  if (!isValidPassword) {
    return next(errorHandler("Please try entering valid password", 400));
  }
  try {
    signToken(foundUser, res);
  } catch (error) {
    next(error);
  }
};

exports.signOut = async function (req, res, next) {
  res.clearCookie("token", { httpOnly: true, secure: true });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};
