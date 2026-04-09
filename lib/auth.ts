import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";




export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: { enabled: true },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
});
