import PG_ID_FIELD_NAME from '../index';

const CATEGORIES = {
  notes: 'notes',
  warnings: 'warnings',
  explanations: 'explanations',
};

export function getDetailListsByApproachIds(findDocumentsByField) {
  return async (approachIds) => {
    const documents = await findDocumentsByField({
      fieldName: PG_ID_FIELD_NAME,
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
