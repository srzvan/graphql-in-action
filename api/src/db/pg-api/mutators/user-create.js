import { randomString } from '../../../utils';

export function userCreate(query) {
  return async ({ input }) => {
    const payload = {
      errors: validateInput(input),
    };

    if (payload.errors.length === 0) {
      const authToken = randomString();

      try {
        const response = await query(statement, {
          $1: input.username.toLowerCase(),
          $2: input.password,
          $3: input.firstName,
          $4: input.lastName,
          $5: authToken,
        });

        const user = response.rows[0];

        if (user) {
          payload.user = user;
          payload.authToken = authToken;
        }
      } catch (error) {
        payload.errors.push({ message: error.message });

        console.log(error);
      }
    }

    return payload;
  };
}

const statement = `
  INSERT INTO azdev.users (username, hashed_password, first_name, last_name, hashed_auth_token)
  VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, crypt($5, gen_salt('bf')))
  RETURNING id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
`;

const ERRORS = {
  minLength: 'The password must have more than 6 characters',
  onlyEnglishLetters:
    'First and last names must contain ONLY letters from the English alphabet',
};
const onlyEnglishLettersRegex = new RegExp(/^[^\d]*[a-z]+$/, 'i');

function validateInput({ password, firstName, lastName }) {
  const errors = [];

  if (password.length < 6) {
    errors.push({ message: ERRORS.minLength });
  }

  if (firstName && !onlyEnglishLettersRegex.test(firstName)) {
    errors.push({ message: ERRORS.onlyEnglishLetters });
  }

  if (lastName && !onlyEnglishLettersRegex.test(lastName)) {
    errors.push({ message: ERRORS.onlyEnglishLetters });
  }

  return errors;
}
