import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Textfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Numberfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Passwordfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Emailfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Telfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Urlfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Searchfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Hiddenfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Colorfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Rangefield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Filefield: string;

  @ApiProperty({
    description: "Name of the item",
    example: true,
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  tamil: boolean;

  @ApiProperty({
    description: "Name of the item",
    example: true,
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  english: boolean;

  @ApiProperty({
    description: "Name of the item",
    example: true,
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  maths: boolean;

  @ApiProperty({
    description: "Name of the item",
    example: true,
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  science: boolean;

  @ApiProperty({
    description: "Name of the item",
    example: true,
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  socialScience: boolean;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Radiofield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Datefield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  DatetimeField: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Timefield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Monthfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  Weekfield: string;

  @ApiProperty({
    description: "Name of the item",
    example: "Sample Item",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  ImageUrl: string;
}

export class EmailDto {
  @ApiProperty({
    description: "email",
    example: "rmkumar204@gmail.com",
  })
  @IsString()
  @IsNotEmpty({ message: "field is Required" })
  email: string;
}
