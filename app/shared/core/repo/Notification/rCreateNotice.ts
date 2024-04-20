import { COLLECTION, DB } from 'shared/types/db';

export const rCreateNotice = async (title: string, description: string, username: string | null) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.NOTIFICATION);

  await collection.insertOne({ title, description, username, created_at: new Date(), read: false });
};
