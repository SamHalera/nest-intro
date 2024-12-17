import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreatePostMetaOptionsDto {
  @IsNotEmpty()
  @IsJSON()
  metaValue: string; //it could be JSON too
}
