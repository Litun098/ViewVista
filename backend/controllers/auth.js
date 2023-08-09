import mongoose from "mongoose";

import bcrypt from "bcrypt";

import JWT from "jsonwebtoken";

import cookieParser from "cookie-parser";

import { createError } from "../error.js";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    return res.status(200).json({
      message: "Signed up successfully.",
      newUser,
    });
  } catch (error) {
    // todo
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const name = req.body.name;

    const user = await User.findOne({ name: name });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isValid) {
      return res.status(200).json({
        message: "User name or password is incorrect.",
      });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT);
    const {password,...userData} = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: "Signed in successfully.",
        userData,
      });

    res.status(200).json({ message: "Successfullu logged in." });
  } catch (error) {
    // todo
    console.log(error);
    next(error);
  }
};
