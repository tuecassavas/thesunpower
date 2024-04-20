import { COLLECTION, DB } from 'shared/types/db';

export const rBlockUser = async (username: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.USERS);

  await collection.updateOne(
    { username: username },
    {
      $set: { is_blocked: true }
    }
  );
};
