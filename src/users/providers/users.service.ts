import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

/**
 * Class to connect to Usaesr table and perform business operations
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    /**
     * Injection UserRepository
     */
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //Check if user already exists with the same email
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      //Handle error is exixts
      console.log('error existing user');
    } else {
      //Create User
      let newUser = this.userRepository.create(createUserDto);

      //save it to DB
      newUser = await this.userRepository.save(newUser);
      return newUser;
    }
  }
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
  async findOneById(id: number) {
    return await this.userRepository.findOneBy({ id });
    return null;
  }
}
