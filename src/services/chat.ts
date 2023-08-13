import { Db } from "../db/Db";
import { MessageDb, MessageManager } from "../db/Messages";
import { getRandId } from "../utills";
import { Notifications } from "./Notifications";

export class ChatService {
  static async sendMessage(msg: Omit<MessageDb, "_id">) {
    const msgToSend = await Db.messagesRepo.write({
      _id: getRandId(),
      message: msg.message,
      sender: msg.sender,
    });
    const users = await Db.userRepo.getAll();
    // console.log(users);
    
    //get connected users 
    

    // socket implementation now
    await Notifications.sendNotification(
      Object.values(users)
        .filter((user) => !!user.subsription && user._id !== msg.sender)
        .map((user) => user.subsription),
      { message: msg.message, title: "" }
    );
  }
}
