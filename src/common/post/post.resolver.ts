import { Query, Resolver } from "@nestjs/graphql";
import { PostLibService } from "libs/post-lib";
import { Post } from "libs/post-lib/schemas/post.schema";

@Resolver()
export class PostResolver {
    constructor(private readonly postsService: PostLibService){}

    @Query(() => [Post])
    getPosts(){
        return this.postsService.findAll();
    }
};