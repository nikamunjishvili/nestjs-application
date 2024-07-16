import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SignUpPayload {
    @Field()
    success: boolean;

    @Field()
    message: string;
}