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
import type { Adapter } from "next-auth/adapters";

interface UserWithRole {
  id: string;
  email: string;
  name?: string | null;
  password?: string | null;
  role: string;
  emailVerified?: Date | null;
}

const customAdapter = SequelizeAdapter(sequelize, {
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
        defaultValue: "",
      },
    }),
  },
});

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name || null,
              role: user.role,
            };
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
        .update({ emailVerified: new Date() }, { where: { id: user.id } });
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
        session.user.role = token.role as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as UserWithRole).role;
        return token;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = (existingUser as any).role || existingUser.role;
      return token;
    },
  },
  adapter: customAdapter,
});

export { sequelize };
