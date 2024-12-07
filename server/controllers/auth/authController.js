import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({ success: false, message: "User already Exists." });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Register User Successfuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // const
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

export { register, login };
