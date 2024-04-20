import { COLLECTION, DB } from 'shared/types/db';
import { ObjectId } from 'mongodb';

export const rReadNotice = async (id: ObjectId) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.NOTIFICATION);

  await collection.updateOne(
    {
      _id: id
    },
    { $set: { read: true } }
  );
};
