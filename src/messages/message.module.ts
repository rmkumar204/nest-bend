// src/messages/messages.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessagesService } from "./message.service";
import { MessagesController } from "./message.controller";
import { Message } from "./entities/message.entity";
import { MessagesGateway } from "./message.gateway";
import { Chat } from "src/chat/entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat, User])], // Registers Message and User entities
  controllers: [MessagesController],
  providers: [MessagesService, MessagesGateway], // MessagesGateway is used for WebSocket communication
  exports: [MessagesService], // Export service for potential reuse
})
export class MessagesModule {}
