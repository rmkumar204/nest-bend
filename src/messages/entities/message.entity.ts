import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Chat } from "../../chat/entities/chat.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => Chat, (user) => user.sentMessages)
  senderUser: Chat;

  @ManyToOne(() => Chat, (user) => user.receivedMessages)
  receiverUser: Chat;

  @Column()
  sender: string; // Add this to store the sender's username

  @CreateDateColumn()
  createdAt: Date;
}
