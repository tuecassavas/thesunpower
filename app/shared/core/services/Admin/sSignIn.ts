import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import * as process from 'process';
import { adminValidation } from 'shared/core/services/helpers/adminValidation';

export const sSignIn = async (username: string, password: string): Promise<string> => {
  const user = await adminValidation(username);

  if (!bcrypt.compareSync(password, user.password)) {
    throw new LogError(ErrorVars.E003_PASSWORD_NOT_CORRECT, 'LOGIC');
  }

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      name: user.name
    },
    process.env.SECRET_ADMIN_TOKEN ?? ''
  );
};
