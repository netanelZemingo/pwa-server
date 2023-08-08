import { PushSubscription } from "web-push";
import { getRandId } from "../utills";
import { Repository, Model } from "./Db";
import storage from "node-persist";

export class User implements Model {
  _id: string;
  username: string;
  password: string;
  subsription?: PushSubscription;
  icon: string;
}

type Users = Record<string, User>;

export const getRandomIcon = (_id: string) => {
  return `https://robohash.org/${_id}?set=set2`;
};

export class UserRepo implements Repository<Users, User, User> {
  async init() {
    if (!(await this.getAll())) {
      await storage.set("users", {});
    }
  }

  async insertDummyData() {
    const _id = getRandId();
    await this.write({
      _id,
      username: "noti56",
      password: "1234",
      icon: getRandomIcon(_id),
    });
  }

  async getAll() {
    const users: Users = await storage.get("users");
    return users;
  }

  async getOne(_id: string) {
    const users: Users = await storage.get("users");
    return users[_id];
  }

  async write(user: User) {
    const users = await this.getAll();
    users[user._id] = user;
    await storage.set("users", users);
    return await this.getOne(user._id);
  }

  async edit(user: User): Promise<boolean> {
    const users = await this.getAll();
    if (users[user._id]) {
      users[user._id] = user;
      await storage.set("users", users);
      return true;
    }
    return false;
  }
}
