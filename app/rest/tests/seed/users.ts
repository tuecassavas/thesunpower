import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const usersSeeding = async (db: Db) => {
  const collection = await db.collection(COLLECTION.USERS);

  await collection.insertMany([
    // Full access user
    {
      username: '84344465654',
      password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC', // 123456
      active: true,
      created_at: new Date(),
      deleted_at: null,
      is_blocked: false,
      verified: true,
      address: '81 nguyen son ha p5 q3',
      dob: '30/06/1999',
      email: 'nvtuehcmus@gmail.com',
      first_name: 'Tue',
      gender: 'MALE',
      last_name: 'Nguyen',
      school: 'khtt',
      tags: ['WEB', 'MOBILE', 'SECURITY'],
      avatar_url: 'https://codetheoyeucau-metadata.s3.ap-southeast-1.amazonaws.com/84344465654/avatar.jpg'
    },
    // No information user
    {
      username: '84329579782',
      password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC', // 123456
      active: true,
      created_at: new Date(),
      deleted_at: null,
      is_blocked: false,
      verified: false
    },
    // Not active user
    {
      username: '84329579783',
      password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC', // 123456
      active: false,
      created_at: new Date(),
      deleted_at: null,
      is_blocked: false,
      verified: false
    },
    // User are blocked
    {
      username: '84329579784',
      password: '$2b$10$KXshzvxrqWVRrrnfYmzkmuAgjunWFWDEvTwi7LDj2Tt5WnnCzndhC', // 123456
      active: true,
      created_at: new Date(),
      deleted_at: null,
      is_blocked: true,
      verified: false
    }
  ]);
};
