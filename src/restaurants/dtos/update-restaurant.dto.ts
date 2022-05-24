import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType() // @InputType이면 resolver의 @Args의 argument에 이름(예:'input')이 반드시 있어야됨
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

//@ArgsType() // @ArgsType이면 resolver의 @Args의 argument는 비워져야됨
@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
