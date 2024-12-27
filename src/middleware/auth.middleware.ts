import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }

    try {
      const secret = this.configService.get<string>("JWT_SECRET");
      const decoded = jwt.verify(token, secret);
      req.user = decoded; // Attach decoded token payload to the request object
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
