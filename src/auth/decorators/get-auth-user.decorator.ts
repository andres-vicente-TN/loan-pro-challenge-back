import { createParamDecorator } from '@nestjs/common';

export const GetAuthUser = createParamDecorator((data, context) => {
  const req = context.getArgs()[0];
  return req.user?.username;
});
