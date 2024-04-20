import { emailValidation } from 'shared/helpers/emailHelper';
import { prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { ADMIN, USERS } from 'shared/types/modal';
import { rGetAdmin } from 'shared/core/repo/Admin/rGetAdmin';

export const adminValidation = async (username: string): Promise<ADMIN> => {
  username = prettierPhoneNumber(username);

  const user = await rGetAdmin(username);

  if (!user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
  }
  if (user.isBlocked) {
    throw new LogError(ErrorVars.E012_USER_IS_BLOCKED, 'LOGIC');
  }

  return user;
};
