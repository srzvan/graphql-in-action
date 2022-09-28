import mongoClient from './mongo-client';

const CATEGORIES = {
  NOTE: 'NOTE',
  WARNING: 'WARNING',
  EXPLANATION: 'EXPLANATION',
};

async function mongoAPIWrapper() {
  const { mdb } = await mongoClient();

  return {
    getDetailListsByApproachIds: async (approachIds) => {
      const documents = await findDocumentsByField({
        collectionName: 'approachDetails',
        fieldName: 'pgId',
        fieldValues: approachIds,
      });

      return approachIds.map((id) => {
        const document = documents.find((doc) => id === doc.pgId);

        if (!document) {
          return [];
        }

        return convertToArrayOfObjects(document);
      });
    },
  };

  function findDocumentsByField({ collectionName, fieldName, fieldValues }) {
    return mdb
      .collection(collectionName)
      .find({ [fieldName]: { $in: fieldValues } })
      .toArray();
  }
}

function convertToArrayOfObjects(document) {
  const { explanations, notes, warnings } = document;
  const approachDetails = [];

  if (explanations) {
    approachDetails.push(
      ...explanations.map((text) => ({
        content: text,
        category: CATEGORIES.EXPLANATION,
      }))
    );
  }

  if (notes) {
    approachDetails.push(
      ...notes.map((text) => ({ content: text, category: CATEGORIES.NOTE }))
    );
  }

  if (warnings) {
    approachDetails.push(
      ...warnings.map((text) => ({ content: text, category: CATEGORIES.WARNING }))
    );
  }

  return approachDetails;
}

export default mongoAPIWrapper;
