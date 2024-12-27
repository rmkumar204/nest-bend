// src/users/users.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatServices {
  constructor(
    @InjectRepository(Chat)
    private usersRepository: Repository<Chat>,
  ) {}

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
  async getAllUsers() {
    return this.usersRepository.find({
      select: ["id", "username"],
    });
  }

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<Chat> {
    const { username, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error("Username already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    return this.usersRepository.save(user);
  }
}
