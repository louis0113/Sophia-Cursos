import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { sequelize } from "@/database";
import { models } from "@auth/sequelize-adapter";
import { LoginSchema } from "./schemas";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/app/lib/data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials: any): Promise<any> => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user: any = await getUserByEmail(email);

          if (!user || !user.password) return null;

          if (user && (await bcrypt.compare(password, user.password))) {
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
  events: {
    async linkAccount({ user }) {
      await sequelize
        .model("user")
        .update(
          { data: { emailVerified: new Date() } },
          { where: { id: user.id } },
        );
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser: any = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
  },
  adapter: SequelizeAdapter(sequelize, {
    models: {
      User: sequelize.define("user", {
        ...models.User,
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "aluno",
        },
      }),
    },
  }),
});

export { sequelize };
