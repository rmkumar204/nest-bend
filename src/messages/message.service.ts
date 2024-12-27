// src/messages/messages.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
import { Chat } from "src/chat/entities/chat.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Chat)
    private usersRepository: Repository<Chat>,
  ) {}

  async createMessage(senderId: number, text: string) {
    // Find the sender from the Users repository
    console.log("senderId", senderId, text);
    const sender = await this.usersRepository.findOne({
      where: { id: senderId },
    });

    if (!sender) {
      throw new Error("Sender not found");
    }

    // Create and save the message
    const message = this.messagesRepository.create({
      text,
      sender: sender.username,
      senderUser: sender,
    });

    return this.messagesRepository.save(message);
  }

  async getMessages(senderId: number, receiverId: number) {
    return this.messagesRepository.find({
      where: [
        { senderUser: { id: senderId }, receiverUser: { id: receiverId } },
        { senderUser: { id: receiverId }, receiverUser: { id: senderId } },
      ],
      relations: ["senderUser", "receiverUser"],
    });
  }
}
