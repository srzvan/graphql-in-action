const SELECT_MOST_RECENT_TASKS = `
  SELECT id, content, tags, approach_count, created_at
    from azdev.tasks
      WHERE is_private = FALSE
      ORDER BY created_at DESC
      LIMIT 100
`;

export async function taskMainList(_, __, context) {
  const { pgPool } = context;
  const response = await pgPool.query(SELECT_MOST_RECENT_TASKS);

  return normalizeData(response.rows);
}

function normalizeData(data) {
  return data.map((task) => ({
    id: task.id,
    content: task.content,
    tags: transformTags(task.tags),
    approachCount: task.approach_count,
    createdAt: transformCreatedAt(task.created_at),
  }));

  function transformTags(tagsString) {
    return tagsString.split(',');
  }

  function transformCreatedAt(date) {
    return new Date(date).toISOString();
  }
}
