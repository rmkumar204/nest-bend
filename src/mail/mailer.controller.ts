import { Controller, Post, Body } from "@nestjs/common";
import { MailService } from "./mailer.service";
import { VerifyOtpDto } from "./dto/verifyotp.dto";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("send")
  async sendMail(
    @Body("to") to: string,
    @Body("subject") subject: string,
    @Body("text") text: string,
    @Body("html") html?: string,
  ) {
    const response = await this.mailService.sendEmail(to, subject, text, html);
    return { message: response };
  }
  @Post("verify-otp")
  async verifyOtp(@Body() verifiyOtpDto: VerifyOtpDto) {
    return await this.mailService.verifyOtp(verifiyOtpDto);
  }
}
