import { COLLECTION, DB } from 'shared/types/db';

export const rApproveRequest = async (requestId: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  await collection.updateOne(
    { request_id: requestId },
    {
      $set: { status: 'APPROVE' }
    }
  );
};
