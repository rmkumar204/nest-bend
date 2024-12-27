import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_details") // Entity table name
export class User {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "varchar", length: 255 })
  Textfield: string;

  @Column({ type: "varchar", length: 255 })
  Numberfield: string;

  @Column({ type: "varchar", length: 255 })
  Passwordfield: string;

  @Column({ type: "varchar", length: 255 })
  Emailfield: string;

  @Column({ type: "varchar", length: 255 })
  Telfield: string;

  @Column({ type: "varchar", length: 255 })
  Urlfield: string;

  @Column({ type: "varchar", length: 255 })
  Searchfield: string;

  @Column({ type: "varchar", length: 255 })
  Hiddenfield: string;

  @Column({ type: "varchar", length: 255 })
  Colorfield: string;

  @Column({ type: "varchar", length: 255 })
  Rangefield: string;

  @Column({ type: "varchar", length: 255 })
  Filefield: string;

  @Column({ type: "boolean" })
  tamil: boolean;

  @Column({ type: "boolean" })
  english: boolean;

  @Column({ type: "boolean" })
  maths: boolean;

  @Column({ type: "boolean" })
  science: boolean;

  @Column({ type: "boolean" })
  socialScience: boolean;

  @Column({ type: "varchar", length: 255 })
  Radiofield: string;

  @Column({ type: "varchar", length: 255 })
  Datefield: string;

  @Column({ type: "varchar", length: 255 })
  DatetimeField: string;

  @Column({ type: "varchar", length: 255 })
  Timefield: string;

  @Column({ type: "varchar", length: 255 })
  Monthfield: string;

  @Column({ type: "varchar", length: 255 })
  Weekfield: string;

  @Column({ type: "varchar", length: 255 })
  ImageUrl: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
