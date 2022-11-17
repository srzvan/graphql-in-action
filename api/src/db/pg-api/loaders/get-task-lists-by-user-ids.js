export function getTaskListsByUserIds(query) {
  return async (userIds) => {
    const response = await query(statement, {
      $1: userIds,
    });

    return userIds.map((uid) => response.rows.filter((row) => uid === row.userId));
  };
}

const statement = `
  SELECT id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt"
  FROM azdev.tasks
  WHERE user_id = ANY ($1)
  ORDER by created_at DESC
`;
