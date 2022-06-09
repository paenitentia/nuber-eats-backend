import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { isNullableType } from 'graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Category } from './category.entity';

@InputType('RestaurantInputType', { isAbstract: true }) //이걸 넣으면 dto에서는 3번째 인자 InputType을 뺄수있다.
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 255)
  name: string;

  // @Field((type) => Boolean, { nullable: true })
  // @Column({ nullable: true })
  // @IsBoolean()
  // @IsOptional()
  // isGood?: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;
}
