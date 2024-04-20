import { COLLECTION, DB } from 'shared/types/db';
import { ADMIN } from 'shared/types/modal';

export const rGetAdmin = async (username: string): Promise<ADMIN | null> => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.ADMIN);
  const user = await collection.findOne({ username });

  if (!user) {
    return null;
  }

  return {
    id: user._id.toString(),
    username: user.username,
    password: user.password,
    isBlocked: user.is_blocked,
    name: user.name,
    createdAt: user.created_at
  };
};
