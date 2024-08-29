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
      return res.status(200).send();
    }

    const user = new User(req.body);
    await user.save();

    return res.status(201).json(user.toObject());
  } catch (err) {
    console.log(err);
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default { createCurrentUser, updateCurrentUser };
