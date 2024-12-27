// src/auth/jwt.strategy.ts
import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { ChatServices } from "src/chat/chat.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: ChatServices) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    });
  }

  async validate(payload: any) {
    return this.usersService.findByUsername(payload.email);
  }
}
