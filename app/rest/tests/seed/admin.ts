import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const adminSeeding = async (db: Db) => {
  const collection = await db.collection(COLLECTION.ADMIN);

  await collection.insertOne(
    // Full access user
    {
      username: '84344465654',
      password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC', // 123456
      is_blocked: false,
      name: 'Tue Nguyen',
      created_at: new Date()
    }
  );
};
