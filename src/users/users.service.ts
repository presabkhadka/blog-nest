import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { userLoginValidator, userSignupValidator } from './users.validator';
import bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) { }
  async signup(data: any) {
    const parsedData = userSignupValidator.safeParse(data);
    if (!parsedData.success) {
      throw new BadRequestException('Validation failed');
    }
    const userExists = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (userExists) {
      return {
        message: 'User with this email id already exists',
      };
    }
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstname: parsedData.data.firstname,
        lastname: parsedData.data.lastname,
        email: parsedData.data.email,
        password: hashedPassword,
        role: 'NORMAL',
      },
    });

    return {
      message: 'User registered successfully',
      data: newUser,
    };
  }

  async login(data: any) {
    const parsedData = userLoginValidator.safeParse(data);
    if (!parsedData.success) {
      throw new BadRequestException('Validation failed');
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!userExists) {
      throw new NotFoundException('User with this email not found');
    }

    const passwordValid = await bcrypt.compare(
      parsedData.data.password,
      userExists.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Password doesnt match');
    }
    const token = await this.jwtService.signAsync({
      email: parsedData.data.email,
    });
    return {
      message: 'Logged in successfully',
      token,
    };
  }
}
