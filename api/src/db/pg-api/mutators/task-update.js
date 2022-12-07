export function taskUpdate(query) {
  return async ({ input, currentUser }) => {
    const payload = { errors: validateInput(input) };

    if (!input.id) {
      payload.errors.push({ message: ERRORS.requiredId });
    }

    if (payload.errors.length === 0) {
      try {
        const [statement, params] = prepareSQLStatement(input);
        const response = await query(statement, {
          $1: currentUser ? currentUser.id : null,
          $2: input.id,
          ...params,
        });

        const task = response.rows[0];

        if (task) {
          payload.task = task;
        }
      } catch (error) {
        payload.errors.push({ message: error.message });

        console.log(error);
      }
    }

    return payload;
  };
}

function prepareSQLStatement({ content, tags, isPrivate }) {
  const condition = [];
  const params = {};
  let currentIndex = 3;

  if (content) {
    condition.push(`content = $${currentIndex}`);
    params[`$${currentIndex}`] = content;
    ++currentIndex;
  }

  if (tags && tags.length > 0) {
    condition.push(`tags = $${currentIndex}`);
    params[`$${currentIndex}`] = tags.join(',');
    ++currentIndex;
  }

  if (isPrivate !== undefined) {
    condition.push(`is_private = $${currentIndex}`);
    params[`$${currentIndex}`] = isPrivate;
  }

  const statement = `
    UPDATE azdev.tasks
      SET ${condition.join(',')}
      WHERE user_id = $1 AND id = $2
      RETURNING id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt";
  `;

  return [statement, params];
}

function validateInput({ content, tags, isPrivate }) {
  const errors = [];

  if (!content && !tags && isPrivate === undefined) {
    errors.push({ message: ERRORS.emptyInput });
  }

  if (tags && tags.length === 0) {
    errors.push({ message: ERRORS.tagsCannotBeEmpty });
  }

  return errors;
}

const ERRORS = {
  emptyInput:
    'At least one of `content`, `tags`, `isPrivate` fields is required for performing an update',
  requiredId: 'Cannot perform an update without an `id`',
  tagsCannotBeEmpty: '`tags` cannot be set to an empty value',
};
