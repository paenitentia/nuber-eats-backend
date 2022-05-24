import { InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

// entity에서 @InputType({ isAbstract: true }) 데코레이터를 안쓴 경우 사용
// @InputType()
// export class CreateRestaurantDto extends OmitType(
//   Restaurant,
//   ['id'],
//   InputType,
// ) {}
@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, ['id']) {}
