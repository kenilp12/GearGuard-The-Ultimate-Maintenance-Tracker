import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;

    // check passwords
    if (password !== rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // create user (password hashed in model)
    const user = await User.create({
      name,
      email,
      password
    });

    // generate jwt
    const token = user.generateToken();

    res.status(201).json({
      message: "Signup successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};
