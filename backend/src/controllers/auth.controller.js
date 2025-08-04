import generateToken from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const SingUpController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "all fields required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be a 6 characters" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "email already exsits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ message: "Failed create User" });
    }

    generateToken(newUser._id, res);

    res.status(201).json({
      message: "Success Create User",
      newUser,
    });
  } catch (error) {
    console.log(`Error in Signup Controller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User Not Found : Please Register First" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid Password" });
    }

    generateToken(userExist._id, res);

    res.status(200).json(userExist);
  } catch (error) {
    console.log(`Error in Login Controller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const LogoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    console.log(`Error in Logout Controller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const UpdateProfileController = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "We-Chat",
      resource_type: "auto",
    });

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(`Error in UpdateProfile Controller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in checkAuth Controller ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
