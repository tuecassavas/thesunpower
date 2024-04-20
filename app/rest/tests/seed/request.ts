import { Db } from 'mongodb';
import { COLLECTION } from '../../../shared/types/db';

export const requestSeed = async (db: Db) => {
  const tagsCollection = await db.collection(COLLECTION.REQUESTS);

  await tagsCollection.insertOne({
    title: 'find developer make flutter application',
    description: 'working remote',
    fee_type: 'PROJECT',
    address: '123/456',
    request_id: '1234',
    fee: '2.000.000',
    contact: null,
    created_by: '84339440639',
    created_at: new Date(),
    status: 'PENDING',
    request_queue: [],
    assign_to: null,
    registered_fee: 0,
    tags: ['MOBILE', 'NETWORK'],
    paid: null,
    is_cancel: false,
    deleted_at: null
  });
};
