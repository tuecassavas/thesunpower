import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const tagsSeeding = async (db: Db) => {
  const tagsCollection = await db.collection(COLLECTION.TAGS);

  await tagsCollection.insertOne({
    tags: ['WEB', 'MOBILE', 'TESTING', 'SECURITY', 'CLOUD', 'NETWORK', 'MENTOR', 'EMBEDDED', 'ANDROID', 'IOS', 'SEMINAR', 'DESIGN', 'DATA', 'OTHER']
  });
};
