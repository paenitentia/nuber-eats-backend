import { InternalServerErrorException } from '@nestjs/common';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { throws } from 'assert';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

export enum UserRole {
  Client = 'Client',
  Owner = 'Owner',
  Delivery = 'Delivery',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  @IsString()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  @Field((type) => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @Field((type) => [Restaurant])
  @OneToMany((type) => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        // required npm i bcrypt
        //this.password = await bcrypt.hash(this.password, 10);
        console.log('called hashPassword');
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      // required npm i bcrypt
      //const ok = await bcrypt.compare(aPassword, this.password);

      //
      const ok = aPassword === this.password;
      return new Promise((resolve, reject) => {
        resolve(ok);
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
