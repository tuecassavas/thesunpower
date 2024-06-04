import { COLLECTION } from 'shared/types/db';
import { usersSeeding } from 'rest/tests/seed/users';
import { tagsSeeding } from 'rest/tests/seed/tags';
import { adminSeeding } from 'rest/tests/seed/admin';
import * as mongoDb from 'mongodb';

const connectToDb = (): Promise<mongoDb.MongoClient> => {
  return new Promise((resolve, reject) => {
    if (!process.env.CONNECTION) {
      reject('No connection string');
    }
    const url = process.env.CONNECTION ?? '';
    mongoDb.MongoClient.connect(url)
      .then((mongoClient) => {
        resolve(mongoClient);
      })
      .catch(() => {
        reject('error');
      });
  });
};

const initDB = async (): Promise<void> => {
  const connector = await connectToDb();

  const instance = connector.db('codetheoyeucau');
  await Promise.all([instance.dropCollection(COLLECTION.USERS), instance.dropCollection(COLLECTION.TAGS), instance.dropCollection(COLLECTION.ADMIN)]);

  await Promise.all([usersSeeding(instance), tagsSeeding(instance), adminSeeding(instance)]);

  await connector.close();
};
beforeAll(async () => {
  await initDB();
});
