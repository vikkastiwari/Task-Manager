import { User } from './user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, req: ExecutionContext):User => {
    const request = req.switchToHttp().getRequest();
    return request.user;
  },
);