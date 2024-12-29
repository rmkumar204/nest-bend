import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const data = await this.userEntity.findOne({
      where: { Emailfield: createUserDto.Emailfield },
    });
    if (data) {
      throw new HttpException("User already exists", HttpStatus.CONFLICT);
    }
    const { Passwordfield } = createUserDto;
    const hashedPassword = bcrypt.hashSync(Passwordfield, 10); // 10 is the salt rounds
    createUserDto.Passwordfield = hashedPassword;
    const user = this.userEntity.create(createUserDto);
    return await this.userEntity.save(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userEntity.findOne({ where: { Emailfield: email } });
  }
  async getContacts(id: number) {
    const data = await this.userEntity.find({ where: { id: Not(id) } });
    if (!data || data.length === 0) {
      throw new HttpException("No Users found", HttpStatus.NOT_FOUND);
    }
    return { data };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user` + updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  getTest(testDto: object) {
    return { res: testDto };
  }
}
