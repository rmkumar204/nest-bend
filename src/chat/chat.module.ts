// src/users/users.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatServices } from "./chat.service";
import { ChatController } from "./chat.controller";
import { Chat } from "./entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])], // Registers the User entity with TypeORM
  controllers: [ChatController],
  providers: [ChatServices],
  exports: [ChatServices], // Exporting service for use in other modules like Auth
})
export class ChatModule {}
