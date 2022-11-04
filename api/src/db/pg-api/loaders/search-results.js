export function searchResults(query) {
  return async ({ searchTerms, currentUser }) => {
    const results = searchTerms.map(async (term) => {
      const response = await query(statement, {
        $1: term,
        $2: currentUser ? currentUser.id : null,
      });

      return response.rows;
    });

    return Promise.all(results);
  };
}

const statement = `
  WITH viewable_tasks AS (
    SELECT *
    FROM azdev.tasks n
    WHERE (is_private = FALSE OR user_id = $2)
  )
  SELECT id, "taskId", content, tags, "approachCount", "voteCount", "userId", "createdAt", type,
          ts_rank(to_tsvector(content), websearch_to_tsquery($1)) AS rank
  FROM (
    SELECT id, id AS "taskId", content, tags, approach_count AS "approachCount", null AS "voteCount", user_id AS "userId", created_at AS "createdAt", 'task' AS type
    FROM viewable_tasks
    UNION ALL
    SELECT a.id, t.id AS "taskId", a.content, null AS tags, null AS "approachCount", a.vote_count AS "voteCount", a.user_id AS "userId", a.created_at AS "createdAt", 'approach' AS type
    FROM azdev.approaches a JOIN viewable_tasks t ON (t.id = a.task_id)
  ) search_view
  WHERE to_tsvector(content) @@ websearch_to_tsquery($1)
  ORDER BY rank DESC, type DESC
`;
