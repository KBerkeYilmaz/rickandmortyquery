import NextAuth, { type User, CredentialsSignin } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/schemas/signInSchema";
import { db } from "./db/schema";
import { allUsers } from "./db";
class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt", maxAge: 3 * 60 * 60 },
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = allUsers.find((user) => user.email === email);

          if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new InvalidLoginError();
          }



          console.log("user", user); 
          return user
            ? { id: user.id, name: user.name, email: user.email }
            : null;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          throw error;
        }
      },
      
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // if (trigger === "update" && session?.name) {
      if (user) {
        token.id = user.id!; // Correctly access the nested 'id'
        token.email = user.email!; // Example of adding more user details to the token
        token.name = user.name!; // Example of adding more user details to the token
      }
      return token;
    },
    async session({ session, token}) {
      // Use the token to set custom session values or modify the session object
      session.user.id = token.id as string;
      session.user.email = token.email!;
      session.user.name = token.name!;
      return session;
    },
  },

});
