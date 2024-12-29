// src/messages/messages.controller.ts
import { Controller, Get, Param } from "@nestjs/common";
import { MessagesService } from "./message.service";

@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get(":senderId/:receiverId")
  async getMessages(
    @Param("senderId") senderId: number,
    @Param("receiverId") receiverId: number,
  ) {
    // Fetch all messages between sender and receiver
    return this.messagesService.getMessages(senderId, receiverId);
  }

  // @Post()
  // async createMessage(@Body() body: { senderId: number; text: string }) {
  //   // Create a new message
  //   return this.messagesService.createMessage(body.senderId, body.text);
  // }
}
