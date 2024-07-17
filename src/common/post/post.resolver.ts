import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostLibService } from "libs/post-lib";
import { CreatePostInput } from "libs/post-lib/dto/create-post.args";
import { PostPayload } from "libs/post-lib/dto/create-post.payload";
import { Post } from "libs/post-lib/schemas/post.schema";

@Resolver()
export class PostResolver {
    constructor(private readonly postsService: PostLibService){}

    @Query(() => [Post])
    getPosts(){
        return this.postsService.findAll();
    }

    @Mutation(() => PostPayload)
    createPost(@Args('input') input: CreatePostInput): Promise<PostPayload>{
        return this.postsService.create(input);
    }

};