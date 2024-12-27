// src/auth/auth.controller.ts
import { Controller, Post, Body, Get } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
// import { ChatServices } from "src/chat/chat.service";
import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

@Controller("auth")
export class AuthController {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
  ) {}

  // @Post("register")
  // async register(@Body() body: { username: string; password: string }) {
  //   return this.usersService.register(body.username, body.password);
  // }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && bcrypt.compareSync(loginDto.password, user.Passwordfield)) {
      const jwtSecret = this.configService.get<string>("JWT_SECRET");
      const token = jwt.sign({ email: user.Emailfield }, jwtSecret, {
        expiresIn: this.configService.get<string>("JWT_EXPIRES_IN"),
      });
      return { token: token, userName: user.Textfield, userId: user.id };
    }
    throw new Error("Invalid credentials");
  }
  @Get("session")
  async checkSession(): Promise<object> {
    console.log("checking");
    return { statusCode: 200, status: true, message: "Success" };
  }
}
