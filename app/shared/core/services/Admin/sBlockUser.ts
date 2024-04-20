import { rBlockUser } from 'shared/core/repo/Admin/rBlockUser';
import { userValidation } from 'shared/core/services/helpers/userValidation';

export const sBlockUser = async (username: string) => {
  await userValidation(username);
  await rBlockUser(username);
};
