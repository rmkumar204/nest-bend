import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MailService } from "./mailer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entities/otp.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([Otp]),
    ConfigModule.forRoot(), // Load .env file
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST, // e.g., 'smtp.gmail.com'
        port: parseInt(process.env.MAIL_PORT, 10) || 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAIL_USER, // your email
          pass: process.env.MAIL_PASSWORD, // your email password or app-specific password
        },
        debug: true, // Enable debug output
        logger: true, // Log SMTP traffic
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
