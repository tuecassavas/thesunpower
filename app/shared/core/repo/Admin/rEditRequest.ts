import { COLLECTION, DB } from 'shared/types/db';

export const rEditRequest = async (requestId: string, updateObject: { [key: string]: string | undefined | string[] }) => {
  const connector = await global.db;
  const instance = connector.db(DB);
  const collection = instance.collection(COLLECTION.REQUESTS);

  const update: { [key: string]: string | undefined | string[] } = {};

  Object.keys(updateObject).map((key) => {
    if (key === 'feeType') {
      update['fee_type'] = updateObject[key];
      return;
    }
    if (key === 'assignTo') {
      update['assign_to'] = updateObject[key];
      return;
    }
    update[key] = updateObject[key];
  });

  await collection.updateOne(
    { request_id: requestId },
    {
      $set: update
    }
  );
};
