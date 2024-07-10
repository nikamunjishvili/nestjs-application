import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePostDto {
  @ApiProperty({example: "Title"})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({example: "Content"})
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({example: "your_user_id"})
  @IsMongoId()
  user: mongoose.Schema.Types.ObjectId;
}
