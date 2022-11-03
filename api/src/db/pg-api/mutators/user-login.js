import { randomString } from '../../../utils';

export function userLogin(query) {
  return async ({ input }) => {
    const payload = {
      errors: validateInput(input),
    };

    if (payload.errors.length === 0) {
      const response = await query(statements.userFromCredentials, {
        $1: input.username.toLowerCase(),
        $2: input.password,
      });

      const user = response.rows[0];

      if (user) {
        const authToken = randomString();
        await query(statements.userUpdateAuthToken, {
          $1: user.id,
          $2: authToken,
        });

        payload.user = user;
        payload.authToken = authToken;
      } else {
        payload.errors.push({ message: ERRORS.invalid });
      }
    }

    return payload;
  };
}

const statements = {
  userFromCredentials: `
    SELECT id, username, first_name AS "firstName", last_name AS "lastName"
    FROM azdev.users
    WHERE username = $1
    AND hashed_password = crypt($2, hashed_password)
  `,
  userUpdateAuthToken: `
    UPDATE azdev.users
    SET hashed_auth_token = crypt($2, gen_salt('bf'))
    WHERE id = $1;
  `,
};

const ERRORS = {
  invalid: 'Invalid username or password',
};

function validateInput({ username, password }) {
  const errors = [];

  if (!username || !password) {
    errors.push({ message: ERRORS.invalid });
  }

  return errors;
}
