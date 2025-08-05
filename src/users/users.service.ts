import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { userLoginValidator, userSignupValidator } from './users.validator';
import bcrypt from 'bcrypt';
import { PrismaClient } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}
  async signup(data: any): Promise<{ message: string; data: any }> {
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
      throw new BadRequestException('User with this mail already exists');
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

  async login(data: any): Promise<{ message: string; token: string }> {
    try {
      const parsedData = userLoginValidator.safeParse(data);
      if (!parsedData.success) {
        throw new BadRequestException('validation failed');
      }

      const userExists = await prisma.user.findFirst({
        where: {
          email: parsedData.data.email,
        },
      });

      if (!userExists) {
        throw new NotFoundException('No user with such email found');
      }

      const passwordMatch = await bcrypt.compare(
        parsedData.data.password,
        userExists.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException(
          'Invalid credentials, Please try again',
        );
      }
      const payload = { email: parsedData.data.email };

      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      console.log(token);

      return {
        message: 'Logged in successfully',
        token,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException(
        'Soemthing went wrong with the server',
      );
    }
  }
}
