import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'libs/user-lib/schemas/user.schemas';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Post extends Document {
  @Field(() => ID)
  _id?: mongoose.Schema.Types.ObjectId

  @Field()
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
