import { registerSchema } from "@/lib/utils/zodSchema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db, allUsers } from "@/server/db";
import { users } from "@/server/db/schema";
import type { User } from "@/lib/types/user";
import bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      // Check if user already exists
      const existingUser = allUsers.find((user) => user.email === email) as
        | User
        | undefined;

      if (existingUser) {
        throw new Error("User already exists with this email.");
      }

      // Hash the password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // Insert new user into the database
      const newUser = (await db
        .insert(users)
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returning()
        .then((result) => result[0])) as User | undefined;
        console.log(newUser);
      if (!newUser) {
        throw new Error("Failed to register user.");
      }

      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      };
    }),
});
