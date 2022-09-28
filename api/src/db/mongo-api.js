import mongoClient from './mongo-client';

const CATEGORIES = {
  notes: 'NOTE',
  warnings: 'WARNING',
  explanations: 'EXPLANATION',
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
  const approachDetails = [];

  const { notes, explanations, warnings } = document;
  const categories = { notes, explanations, warnings };

  Object.keys(categories).forEach((category) => {
    const values = categories[category];

    if (values) {
      approachDetails.push(
        ...values.map((text) => ({
          content: text,
          category: CATEGORIES[category],
        }))
      );
    }
  });

  return approachDetails;
}

export default mongoAPIWrapper;
