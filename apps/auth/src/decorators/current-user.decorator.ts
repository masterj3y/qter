import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../users/models/user.schema';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};
