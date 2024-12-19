import {
  BadRequestException,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**
     * Inject User Repository
     */
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    /**
     * Inject DataSource for Transaction
     *
     */
    private readonly dataSource: DataSource,
  ) {}
  /**
   * TRANSACTIONS
   *
   * If CreateUserDto is defined as array it do not give validation on fields but only type safety
   *Need to change config in the DTO TODO
   */
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];

    //Create a Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      //Connect the query runner to datasource
      await queryRunner.connect();
      //Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    try {
      //create many users
      for (let user of createManyUsersDto.users) {
        let existingUser = undefined;
        try {
          existingUser = await this.userRepository.findOne({
            where: { email: user.email },
          });
        } catch (error) {
          throw new RequestTimeoutException(
            'Unable to process your request at the moment. Please try later.',
            {
              description: 'Error fetching user from the database',
            },
          );
        }
        if (existingUser) {
          throw new BadRequestException(
            'The user already exists, please check your email',
          );
        }

        let newUser = queryRunner.manager.create(User, user);

        let result = undefined;
        try {
          result = await queryRunner.manager.save(newUser);
        } catch (error) {
          throw new RequestTimeoutException(
            'Unable to process your request at the moment. Please try later.',
            {
              description: 'Error saving user to the database',
            },
          );
        }

        newUsers.push(result);
      }
      // If successful --> commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      // If unsuccessful --> roolback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        // Fianlly close the data connection --> release()
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection');
      }
    }

    return newUsers;
  }
}
