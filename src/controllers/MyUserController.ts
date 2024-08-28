import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    if (!auth0Id) {
      return res.status(400).json({ message: "auth0Id is required" });
    }

    const exisitingUser = await User.findOne({ auth0Id });
    if (exisitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User(req.body);
    await user.save();

    return res.status(201).json(user.toObject());
  } catch (err) {
    console.log(err);
  }
};

export default { createCurrentUser };
