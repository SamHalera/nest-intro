import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: "For exemple : 'my-url'",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Slug is too short' })
  @MaxLength(256, { message: 'Slug is too Long' })
  @Matches(/^[a-z0-9]+(?:-[a-z09]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @MaxLength(1024)
  @IsOptional()
  featuresImageUrl?: string;
}
