import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    //AuthService
    const isAuth = this.authService.isAuthenticated();
    console.log(isAuth);
    return [
      {
        firstName: 'John',
        email: 'john@mail.com',
      },
      {
        firstName: 'Peter',
        email: 'peter@mail.com',
      },
    ];
  }

  findOneById(id: string) {
    console.log('findOneById method==>', id);
    const user = {
      id: 2,
      firstName: 'Peter',
      email: 'peter@mail.com',
    };
    if (user.id === parseFloat(id)) {
      console.log(user);
      return user;
    }
    return null;
  }
}
