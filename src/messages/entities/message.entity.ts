import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  senderUser: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  receiverUser: User;

  @Column()
  sender: string; // Add this to store the sender's username

  @CreateDateColumn()
  createdAt: Date;
}
