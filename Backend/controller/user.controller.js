import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpwd = await bcryptjs.hash(password, 10);
    const createdUser = await new User({
      name,
      email,
      password: hashpwd,
    });
    await createdUser.save();
    res.status(200).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const isMatched = await bcryptjs.compare(password, user.password);
    if (!user || !isMatched) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      res.status(200).json({
        message: "Login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
