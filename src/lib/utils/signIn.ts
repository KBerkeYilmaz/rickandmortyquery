import bcrypt from "bcrypt";
import type { User } from "@/lib/types/user";
import { allUsers } from "@/server/db";

const SALT_ROUNDS = 10;

/**
 * Salts and hashes the password using bcrypt.
 * @param password - The plaintext password to hash.
 * @returns The hashed password.
 */
export const saltAndHashPassword = (password: string): string => {
  const salt: string = bcrypt.genSaltSync(SALT_ROUNDS);
  const hash: string = bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * Finds a user in the database and verifies the password.
 * @param email - The user's email.
 * @param password - The plaintext password to verify.
 * @returns The user object if found and password matches, null otherwise.
 */
export const getUserFromDb = async (email: string, password: string): Promise<User | null> => {
  const user = allUsers.find(user => user.email === email);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.emailVerified,
    image: user.image,
    password: user.password,
  };
};
