import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

/**
 * Class to connect to Usaesr table and perform business operations
 */
@Injectable()
export class UsersService {
  // constructor(
  //   @Inject(forwardRef(() => AuthService))
  //   private readonly authService: AuthService,
  // ) {}

  /**
   * The method to get all users from database
   * @param getUsersParamDto
   * @param limit
   * @param page
   * @returns
   */
  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    // //AuthService
    // const isAuth = this.authService.isAuthenticated();
    // console.log(isAuth);
    const users = [
      {
        firstName: 'John',
        email: 'john@mail.com',
      },
      {
        firstName: 'Peter',
        email: 'peter@mail.com',
      },
    ];
    return users;
  }

  /**
   * Find a single user by ID User
   * @param id
   * @returns
   */
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
