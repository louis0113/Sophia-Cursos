import "@/models/User.model";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import SequelizeAdapter from "@auth/sequelize-adapter";
import { LoginSchema } from "../schemas/index";
import { sequelize } from "@/database";
import UserCredentials from "@/models/User.model";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any): Promise<any> => {
        const user = await UserCredentials.findOne({
          where: { email: email },
        });

        if (user && (await user.validatePassword(password))) {
          return { id: user.id, email: user.email, name: user.username };
        }

        return null;
      },
    }),
    Google,
    Github,
  ],
  adapter: SequelizeAdapter(sequelize),
});

export { sequelize };
