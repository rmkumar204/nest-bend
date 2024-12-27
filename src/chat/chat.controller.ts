// src/users/users.controller.ts
import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { ChatServices } from "./chat.service";
import { Chat } from "./entities/chat.entity";
import { CreateUserDto } from "./dto/create-chat.dto";

@Controller("users")
export class ChatController {
  constructor(private readonly usersService: ChatServices) {}

  @Get(":username")
  async getUser(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Post("register")
  async register(@Body() createUserDto: CreateUserDto): Promise<Chat> {
    return this.usersService.createUser(createUserDto);
  }
}
