import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registerd users on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched succesfully on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    console.log(getUsersParamDto);
    if (getUsersParamDto.id) {
      const user = this.usersService.findOneById(getUsersParamDto.id);
      return user;
    }
    const users = this.usersService.findAll(getUsersParamDto, limit, page);

    return users;
  }

  @Post()
  public createUsers(@Body() createUserDto: CreateUserDto) {
    const newUser = this.usersService.createUser(createUserDto);

    return newUser;
  }

  @Patch()
  public patchUser(@Body() PatchUserDto: PatchUserDto) {
    return 'Patch endpoint';
  }
}
