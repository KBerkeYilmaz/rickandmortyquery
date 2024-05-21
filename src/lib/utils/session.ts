import { db, sessions } from "@/server/db/schema";
import { v4 as uuidv4 } from 'uuid';

export async function createSession(userId: string, expires: Date) {
  const sessionToken = uuidv4();

  await db.insert(sessions).values({
    sessionToken,
    userId,
    expires,
  }).execute();

  return sessionToken;
}
