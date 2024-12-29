import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import configuration from "./config/configuration";
import { ChatModule } from "./chat/chat.module";
import { AuthController } from "./auth/auth.controller";
import { JwtStrategy } from "./auth/jwt.strategy";
import { MessagesModule } from "./messages/message.module";
import { MailModule } from "./mail/mailer.module";
import { MailController } from "./mail/mailer.controller";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres", // Or any other database type you are using
        url: configService.get<string>("database.url"),
        autoLoadEntities: true, // Automatically load entities
        synchronize: true, // Should be false in production
      }),
    }),
    UserModule,
    ChatModule,
    MessagesModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController, MailController],
  providers: [AppService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: "user", method: RequestMethod.POST },
        { path: "mail/send", method: RequestMethod.POST },
        { path: "mail/verify-otp", method: RequestMethod.POST },
        { path: "auth/login", method: RequestMethod.POST },
        { path: "auth/register", method: RequestMethod.POST },
      )
      .forRoutes("*");
  }
}
