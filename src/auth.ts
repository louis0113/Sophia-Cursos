import "@/models/User.model";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from "@/database";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./app/lib/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "some@email.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
      authorize: async (credentials: any): Promise<any> => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          if (user && (await user.validatePassword(password))) {
            return user;
          }
        }
        return null;
      },
    }),
    Google,
    Github,
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      console.log(session);
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  adapter: SequelizeAdapter(sequelize),
});
export { sequelize };
