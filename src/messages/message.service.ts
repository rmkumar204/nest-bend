// src/messages/messages.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Message } from "./entities/message.entity";
// import { Chat } from "src/chat/entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async createMessage(senderId: number, receiverId: number, text: string) {
    const sender = await this.userEntity.findOne({
      where: { id: senderId },
    });
    const receiver = await this.userEntity.findOne({
      where: { id: receiverId },
    });

    // Validate sender and receiver
    if (!sender) {
      throw new Error("Sender not found");
    }
    if (!receiver) {
      throw new Error("Receiver not found");
    }

    // Create the message entity
    const message = this.messagesRepository.create({
      text,
      sender: sender.Textfield || sender.Emailfield, // Make sure sender has a valid identifier
      senderUser: sender,
      receiverUser: receiver,
    });

    // Save the message
    try {
      const savedMessage = await this.messagesRepository.save(message);
      console.log("savedmess", savedMessage);
      return savedMessage;
    } catch (error) {
      console.error("Error saving message:", error);
      throw new Error("Failed to save the message");
    }
  }

  async getMessages(senderId: number, receiverId: number) {
    console.log("dd", senderId, receiverId);
    return this.messagesRepository.find({
      where: [
        { senderUser: { id: senderId }, receiverUser: { id: receiverId } },
        { senderUser: { id: receiverId }, receiverUser: { id: senderId } },
      ],
      relations: ["senderUser", "receiverUser"],
    });
  }
}
