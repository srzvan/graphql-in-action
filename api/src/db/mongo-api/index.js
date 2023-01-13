import mongoClient from '../mongo-client';
import { approachDetailCreate } from './mutators/approach-detail-create';
import { getDetailListsByApproachIds } from './loaders/get-details-lists-by-approach-ids';

const APPROACH_DETAILS_COLLECTION = 'approachDetails';
export const PG_ID_FIELD_NAME = 'pgId';

async function mongoAPIWrapper() {
  const { mdb } = await mongoClient();

  return {
    loaders: {
      getDetailListsByApproachIds: getDetailListsByApproachIds(findDocumentsByField),
    },
    mutators: {
      approachDetailCreate: approachDetailCreate(insertOne),
    },
  };

  function findDocumentsByField({ fieldName, fieldValues }) {
    return mdb
      .collection(APPROACH_DETAILS_COLLECTION)
      .find({ [fieldName]: { $in: fieldValues } })
      .toArray();
  }

  function insertOne(document) {
    mdb.collection(APPROACH_DETAILS_COLLECTION).insertOne(document);
  }
}

export default mongoAPIWrapper;
