import { Db, Model, OneToOne, OneToOneDTO, RelationsParams, Repository } from "./Db";
import storage from "node-persist";
import { User, UserDto } from "./Users";

export class MessageManager implements Model {
  constructor(public message: string, senderId: string, public _id: string) {
    this.sender._id = senderId;
  }
  sender = new OneToOne<User>("userRepo");
  getDataToSave(): MessageDb {
    return { _id: this._id, message: this.message, sender: this.sender._id };
  }
  toDto(): MessageDto {
    let user: User | undefined;
    if (this.sender.data) {
      user = JSON.parse(JSON.stringify(this.sender.data));
      delete user.password;
      delete user.subsription;
    }

    return {
      _id: this._id,
      message: this.message,
      sender: { _id: this.sender._id, data: user },
    };
  }
}

export interface MessageDb {
  _id: string;
  message: string;
  sender: string;
}

export interface MessageDto {
  _id: string;
  message: string;
  sender: OneToOneDTO<UserDto>;
}

type MessagesDb = Record<string, MessageDb>;

export class ChatRepo implements Repository<MessagesDb, MessageDb, MessageManager> {
  async init() {
    if (!(await storage.get("chats"))) {
      await storage.set("chats", {});
    }
  }

  // async insertDummyData() {
  //   // await  this.write({ _id: getRandId(), sender: "noti56", password: "1234" });
  // }

  async getAll(params?: RelationsParams) {
    const chats: MessagesDb = await storage.get("chats");

    const msgManagers: Record<string, MessageManager> = {};
    for (const msg of Object.values(chats)) {
      const msgManager = new MessageManager(msg.message, msg.sender, msg._id);
      if (params?.getRelations) {
        await msgManager.sender.getRelation();
      }
      msgManagers[msgManager._id] = msgManager;
    }
    return msgManagers;
  }

  async getOne(_id: string) {
    const chats: MessagesDb = await storage.get("chats");
    return chats[_id];
  }

  async write(msg: MessageDb) {
    const messages: MessagesDb = await storage.get("chats");
    messages[msg._id] = msg;
    return (await storage.set("chats", messages)).content[msg._id] as MessageDb;
  }

  async edit(_id: string, chat: MessageManager): Promise<boolean> {
    throw new Error("not implemented ");
    const messages: MessagesDb = await storage.get("chats");
    if (messages[chat._id]) {
      messages[chat._id] = chat.getDataToSave();
      await storage.set("chats", messages);
      return true;
    }
    return false;
  }
}
