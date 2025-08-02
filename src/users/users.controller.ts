import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/login')
  async login(@Body() body: any) {
    return this.usersService.login(body);
  }

  @Post('/signup')
  async signup(@Body() body: any) {
    return this.usersService.signup(body);
  }
}
