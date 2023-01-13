export function approachCreate(query) {
  return async ({ taskId, currentUser, input, mutators }) => {
    const payload = { errors: [] };

    if (payload.errors.length === 0) {
      const response = await query(statements.approach, {
        $1: currentUser.id,
        $2: input.content,
        $3: taskId,
      });

      const approach = response.rows[0];

      if (approach) {
        payload.approach = approach;
        await query(statements.incrementApproachCount, {
          $1: taskId,
        });
        await mutators.approachDetailCreate(payload.approach.id, input.detailList);
      }
    }

    return payload;
  };
}

const statements = {
  approach: `
    INSERT INTO azdev.approaches (user_id, content, task_id)
      VALUES ($1, $2, $3)
      RETURNING id, content, user_id AS "userId", task_id AS "taskId", vote_count AS "voteCount", created_at AS "createdAt";
  `,
  incrementApproachCount: `
    UPDATE azdev.tasks t
      SET approach_count = (select count(id) from azdev.approaches where task_id = t.id)
      WHERE id = $1
      RETURNING id, content, tags, user_id AS "userId", approach_count AS "approachCount", is_private AS "isPrivate", created_at AS "createdAt";
  `,
};
