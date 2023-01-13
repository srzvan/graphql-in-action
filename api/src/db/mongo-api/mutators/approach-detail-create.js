export function approachDetailCreate(insertOne) {
  return async (approachId, detailsInput) => {
    const details = {};

    detailsInput.forEach(({ content, category }) => {
      details[category] = details[category] || [];
      details[category].push(content);
    });

    return insertOne({
      pgId: approachId,
      ...details,
    });
  };
}
