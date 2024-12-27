import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Message } from "../../messages/entities/message.entity";

@Entity()
export class Chat {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.senderUser)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.receiverUser)
  receivedMessages: Message[];
}
