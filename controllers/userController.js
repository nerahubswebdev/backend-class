import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register business logic
const register = async (req, res) => {
  try {
    // lets get the body from the request
    const { name, email, bio, password } = req.body;
    const body = req.body;

    // check if required user details are available
    if (!name || !email || !bio || !password) {
      res.status(400).json({
        success: false,
        message: "Required fields needed",
      });
      return;
    }

    // check if the email already exists
    const userexists = await User.findOne({ email: email }).exec();

    if (userexists) {
      res.status(409).json({
        success: false,
        message: "user already exists",
      });
      return;
    }

    console.log("the user = ", userexists);

    //encrypting the password
    const salt = await bcrypt.genSalt(15);
    const encryptedpassword = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      name,
      email,
      bio,
      password: encryptedpassword,
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully..",
      // user: newuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// login business logic
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cheking if email and password is sent
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Required fields needed",
      });
      return;
    }

    // check if the email already exists
    const userexists = await User.findOne({ email: email }).exec();

    if (!userexists) {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    // compare passwords and check if the password is a valid password

    const validPassword = await bcrypt.compare(password, userexists.password);

    if (!validPassword) {
      res.status(409).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    // //TODO: sign a jwt token and produce cookies for access and refresh
    // create an access token
    const accessToken = jwt.sign(
      {
        access1: userexists?._id,
      },
      process.env.jwt_secret,
      {
        expiresIn: process.env.accesstime,
      }
    );

    const refreshToken = jwt.sign(
      {
        access2: userexists?._id,
      },
      process.env.refresh_secret,
      {
        expiresIn: process.env.refreshtime,
      }
    );

    // console.log("the access token => ", accessToken);

    //the cookies
    res.cookie("access", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 20 * 60 * 1000,
    });

    res.cookie("refresh", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();

    res.status(200).json({
      success: true,
      message: "Users fetched",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const validateUser = async (req, res) => {
  const userdetails = req.user;

  // if (!userdetails) {
  //   res.status(400).json({
  //     valid: false,
  //     message: "access denied",
  //   });
  //   return;
  // }

  const userdata = {
    id: userdetails._id,
    name: userdetails.name,
    email: userdetails.email,
    bio: userdetails.bio,
    image: userdetails.image,
  };

  res.status(200).json({
    valid: true,
    message: "access granted",
    userDetails: userdata,
  });
};

const logout = async (req, res) => {
  try {
    // we want to clear all the cookies
    res.clearCookie("access", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logeed out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not Logeed out",
    });
  }
};

export { register, login, getUsers, getUser, validateUser, logout };
