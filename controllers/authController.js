import userModel from "../models/userModel.js";

export const userSignup = async (req, res) => {
  try {
    console.log(999, req.body)
    const { email, password, firstName, lastName, mobileNo } = req.body;

    const totalCount = await userModel.countDocuments({ role: "user" });
    const id = "SC-" + totalCount;

    const existingUser = await userModel.findOne({ email, role: { $ne: "tempUser" } });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = new userModel({
      email,
      password,
      id,
      firstName,
      lastName,
      mobileNo
    });

    const token = await user.generateToken();
    res.cookie("token", token, { httpOnly: true, maxAge: 90 * 24 * 60 * 60 * 1000 });

    await user.save();

    res.status(201).json({ success: true, message: "User created", user, token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = await user.generateToken();
    res.cookie("token", token, { httpOnly: true, maxAge: 90 * 24 * 60 * 60 * 1000 });

    res.status(200).json({ success: true, message: "Login successful", user, token });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
