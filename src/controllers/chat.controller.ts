import { Router, Request } from "express";
import { MessageDb, MessageDto, MessageManager } from "../db/Messages";
import { ChatService } from "../services/chat";
import { Db } from "../db/Db";

export const chatController = Router();

chatController.post("", async (req, res) => {
  const data: Omit<MessageDb, "_id"> = req.body;
  if (!data.message || !data.sender) return res.status(400).json({ msg: "missing some data" });
  await ChatService.sendMessage(data);
  res.status(201).json({ msg: "sent" });
});

chatController.get("", async (req, res) => {
  const messages = await Db.messagesRepo.getAll({ getRelations: true });
  const messagesDto: Record<string, MessageDto> = {};
  Object.values(messages).forEach((msg) => {
    messagesDto[msg._id] = msg.toDto();
  });
  res.status(200).json({ msg: "sent", messages: messagesDto });
});
