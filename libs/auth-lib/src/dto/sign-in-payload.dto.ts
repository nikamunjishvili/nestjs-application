import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignInPayload {
    @Field()
    status: boolean;

    @Field()
    token: string;
}