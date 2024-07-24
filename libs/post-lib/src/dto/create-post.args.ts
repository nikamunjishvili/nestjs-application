import { Field, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => String, { nullable: true })
  user: mongoose.Schema.Types.ObjectId;
}
