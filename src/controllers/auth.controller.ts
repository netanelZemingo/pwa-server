import { Router } from "express";
import { User, getRandomIcon } from "../db/Users";
import { Db } from "../db/Db";
import { getRandId } from "../utills";
import webpush from "web-push";
export const authController = Router();
type UserRegisterReq = Omit<User, "_id">;

authController.post("/register", async (req, res) => {
  try {
    const data: UserRegisterReq = req.body;
    const { password, username, subsription } = data;
    if (!password || !username) return res.status(400).json({ msg: "missing some data" });
    const _id =  getRandId()
    const user: User = { _id, password, username, subsription,icon:getRandomIcon(_id) };
    const userFromDb = await Db.userRepo.write(user);
    if (user.subsription) {
      webpush.sendNotification(user.subsription, JSON.stringify({ title: "welcome motek" }));
    }

    return res.status(201).json({ msg: "created User", user: userFromDb });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});
