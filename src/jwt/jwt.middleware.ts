import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

// 클래스
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // console.log(req.headers);
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          //console.log(decoded['id']);
          const user = await this.userService.findById(decoded['id']);
          //console.log(user);
          req['user'] = user;
        }
      } catch (e) {}
    }
    next();
  }
}

// 함수
// export function JwtMiddlewareFunc(
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   console.log(req.headers);
//   next();
// }
