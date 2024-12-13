import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,

    /**
     * Injection of PostRepository
     */
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    const existingPost = await this.postRepository.findOne({
      where: { slug: createPostDto.slug },
    });

    if (existingPost) {
      //handle error
    } else {
      let newPost = this.postRepository.create(createPostDto);
    }
  }
  findAll(userId: string) {
    console.log('userId from arg==>', userId);

    const user = this.usersService.findOneById(userId);

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
