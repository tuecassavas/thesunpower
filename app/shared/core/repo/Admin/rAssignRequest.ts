import { COLLECTION, DB } from 'shared/types/db';
import { REQUEST_STATE_STATUS } from 'shared/types/modal';

export const rAssignRequest = async (requestId: string, assignTo: string) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  await collection.updateOne(
    { request_id: requestId },
    {
      $set: { assign_to: assignTo, status: REQUEST_STATE_STATUS.ASSIGN }
    }
  );
};
