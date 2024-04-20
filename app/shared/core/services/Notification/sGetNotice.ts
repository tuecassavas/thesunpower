import { userValidation } from 'shared/core/services/helpers/userValidation';
import { NOTIFICATION_RESPONSE } from 'shared/types/modal';
import { ObjectId } from 'mongodb';
import { rGetNotice } from 'shared/core/repo/Notification/rGetNotice';
import { rReadNotice } from 'shared/core/repo/Notification/rReadNotice';

export const sGetNotice = async (username: string, id: ObjectId): Promise<NOTIFICATION_RESPONSE | null> => {
  await userValidation(username);
  rReadNotice(id);
  return await rGetNotice(username, id);
};
