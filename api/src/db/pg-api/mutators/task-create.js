export function taskCreate(query) {
  return async ({ input, currentUser }) => {
    const payload = { errors: validateInput(input) };

    if (payload.errors.length === 0) {
      const response = await query(statement, {
        $1: currentUser.id,
        $2: input.content,
        $3: input.tags.join(','),
        $4: input.isPrivate,
      });
      const task = response.rows[0];

      if (task) {
        payload.task = task;
      }
    }

    return payload;
  };
}

function validateInput({ content }) {
  const errors = [];

  if (content.length < 15) {
    errors.push({
      message: ERRORS.contentMinLength,
    });
  }

  return errors;
}

const statement = `
  INSERT INTO azdev.tasks (user_id, content, tags, is_private)
    VALUES ($1, $2, $3, $4)
    RETURNING id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt";
`;

const ERRORS = {
  contentMinLength: 'Text is too short',
};
