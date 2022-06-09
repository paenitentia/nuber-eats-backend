import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Restaurant } from '../entities/restaurant.entity';

// entity에서 @InputType({ isAbstract: true }) 데코레이터를 안쓴 경우 사용
// @InputType()
// export class CreateRestaurantDto extends OmitType(
//   Restaurant,
//   ['id'],
//   InputType,
// ) {}
@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
