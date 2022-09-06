const SELECT_MOST_RECENT_TASKS = `
  SELECT id, content, tags,
    approach_count AS "approachCount",
    created_at AS "createdAt"
      from azdev.tasks
        WHERE is_private = FALSE
        ORDER BY created_at DESC
        LIMIT 100
`;

export async function taskMainList(_, __, context) {
  const { pgPool } = context;
  const response = await pgPool.query(SELECT_MOST_RECENT_TASKS);

  return response.rows;
}
