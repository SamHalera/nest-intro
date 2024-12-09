import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { UsersService } from 'src/users/providers/users.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get('/:userId?')
  public getPosts(@Param('userId') userId: string) {
    console.log('userId==>', userId);

    const posts = this.postsService.findAll(userId);
    console.log(posts);

    return 'Get Posts endpoint.';
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your post is created succesfully',
  })
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log('createPOstDto==>', createPostDto);
    console.log(new Date());
    return 'Create post';
  }

  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if your post is updated succesfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
