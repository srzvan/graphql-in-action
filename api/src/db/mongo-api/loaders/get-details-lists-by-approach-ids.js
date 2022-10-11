const COLLECTION_NAME = 'approachDetails';
const FIELD_NAME = 'pgId';

const CATEGORIES = {
  notes: 'NOTE',
  warnings: 'WARNING',
  explanations: 'EXPLANATION',
};

export function getDetailListsByApproachIds(findDocumentsByField) {
  return async (approachIds) => {
    const documents = await findDocumentsByField({
      collectionName: COLLECTION_NAME,
      fieldName: FIELD_NAME,
      fieldValues: approachIds,
    });

    return approachIds.map((id) => {
      const document = documents.find((doc) => id === doc.pgId);

      if (!document) {
        return [];
      }

      return convertToArrayOfObjects(document);
    });
  };
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
