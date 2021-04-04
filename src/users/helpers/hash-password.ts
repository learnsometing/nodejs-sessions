// bcrypt
import * as bcrypt from 'bcrypt';

/**
 * Hash the user's plaintext password.
 * @param {string} password - user's plaintext password
 */
export default async function hashPassword(password: string) {
  const SALT_OR_ROUNDS = 10;

  const hash = await bcrypt.hash(password, SALT_OR_ROUNDS);

  return hash;
}
