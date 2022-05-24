import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { isNullableType } from 'graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@InputType({ isAbstract: true }) //이걸 넣으면 dto에서는 3번째 인자 InputType을 뺄수있다.
@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 255)
  name: string;

  @Field((type) => Boolean, { nullable: true })
  @Column({ nullable: true })
  @IsBoolean()
  @IsOptional()
  isGood?: boolean;

  @Field((type) => Boolean, { defaultValue: true }) // for graphql schema
  @Column({ default: true }) // for database(typeorm)
  @IsBoolean() // for validation
  @IsOptional() // for validation
  isVegan: boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => String)
  @Column()
  ownerName: string;

  //   @Field((type) => String)
  //   @Column()
  //   categoryName: string;
}
