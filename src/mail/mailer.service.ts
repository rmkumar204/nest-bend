// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BadRequestException, Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
// import axios from "axios";
import { Otp } from "./entities/otp.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VerifyOtpDto } from "./dto/verifyotp.dto";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Otp) private readonly otpEntity: Repository<Otp>,
  ) {}

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    // const apiKey = process.env.ZEROBOUNCE_API_KEY;
    try {
      // const isValid = await validateEmail(to, apiKey);
      // if (!isValid) {
      //   throw new BadRequestException("Invalid or non-existent email address");
      // }
      const OTP = await this.generateOTP();
      const updatedText = `${text} Your OTP is: ${OTP}`;
      const updatedHtml = html
        ? `${html}<p>Your OTP is: <strong>${OTP}</strong></p>`
        : `<p>Your OTP is: <strong>${OTP}</strong></p>`;

      text = updatedText;
      html = updatedHtml;
      const result = await this.mailerService.sendMail({
        to,
        subject,
        text,
        html,
      });
      if (result && result.accepted && result.accepted.length > 0) {
        const otpData = {
          email: to,
          otp: OTP,
        };
        await this.otpEntity.save(otpData);
      }
      if (result && result.rejected && result.rejected.length > 0) {
        console.warn("Rejected recipients:", result.rejected);
      }
      return result;
    } catch (error) {
      console.error("Failed to send email:", error.message);
      if (error.response) {
        console.error("SMTP Response:", error.response);
      }
      throw error;
    }
  }
  async generateOTP(): Promise<string> {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<object> {
    const otp = await this.otpEntity.findOne({
      where: { email: verifyOtpDto.email },
      order: { createdAt: "DESC" },
    });
    const currentTime = new Date();
    const otpCreationTime = otp.createdAt;
    const expiryTime = 2 * 60 * 1000; // 2 minutes in milliseconds
    const isExpired =
      currentTime.getTime() - otpCreationTime.getTime() > expiryTime;

    if (isExpired) {
      throw new Error("OTP has expired");
    }

    if (otp.otp === verifyOtpDto.otp) {
      return { message: "OTP verified successfully", success: true };
    } else {
      throw new Error("Invalid OTP");
    }
  }
}
// async function validateEmail(email: string, apiKey: string): Promise<boolean> {
//   const response = await axios.get(
//     `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${email}`,
//   );

//   return response.data.status === "valid";
// }
