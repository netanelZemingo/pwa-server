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
    const _id = getRandId();
    const user: User = { _id, password, username, subsription, icon: getRandomIcon(_id) };
    const userFromDb = await Db.userRepo.write(user);
    if (user.subsription) {
      webpush.sendNotification(
        user.subsription,
        JSON.stringify({ title: "welcome " + user.username })
      );
    }

    return res.status(201).json({ msg: "created User", user: userFromDb });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

authController.post("/validate-user", async (req, res) => {
  try {
    const data: User = req.body;
    const { _id } = data;
    const user = await Db.userRepo.getOne(_id);

    return res.status(200).json({ msg: "User is active", isUser: !!user });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

interface UserSubsriptionReq {
  _id: string;
  user: Omit<Partial<User>, "_id">;
  fromServiceWorker?: boolean;
}
authController.post("/subscribe", async (req, res) => {
  try {
    const data: UserSubsriptionReq = req.body;
    if (data.fromServiceWorker) {
      console.warn("FROM service WORKER", data);
    }
    const { _id, user } = data;
    await Db.userRepo.edit(_id, user);
    return res.status(201).json({ msg: "Subscribed!" });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});
