import mongoClient from '../mongo-client';
import { getDetailListsByApproachIds } from './loaders/get-details-lists-by-approach-ids';

async function mongoAPIWrapper() {
  const { mdb } = await mongoClient();

  return {
    loaders: {
      getDetailListsByApproachIds: getDetailListsByApproachIds(findDocumentsByField),
    },
    mutators: {},
  };

  function findDocumentsByField({ collectionName, fieldName, fieldValues }) {
    return mdb
      .collection(collectionName)
      .find({ [fieldName]: { $in: fieldValues } })
      .toArray();
  }
}

export default mongoAPIWrapper;
