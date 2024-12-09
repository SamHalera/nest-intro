import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}
  findAll(userId: string) {
    console.log('userId from arg==>', userId);
    //Find User

    const user = this.usersService.findOneById(userId);
    //If user exists and user has posts return posts
    if (user) {
      console.log(user);
      const posts = [
        {
          user: user,
          title: 'Title 1',
          conttetn: 'Content 1',
        },
        {
          user: user,
          title: 'Title 2',
          conttetn: 'Content 2',
        },
      ];
      return posts;
    }
    return null;
  }
}
