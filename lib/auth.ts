import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
      },
      isActive: {
        type: "boolean",
        required: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // check if email is in allowed list
          const allowedEmail = await prisma.allowedEmail.findUnique({
            where: { email: user.email },
          })

          if (!allowedEmail) {
            throw new APIError("UNAUTHORIZED", {
              message:
                "Unauthorized: Access restricted. Please contact your administrator.",
            })
          }

          if (!allowedEmail.isActive) {
            throw new APIError("FORBIDDEN", {
              message:
                "Account Disabled: Your account has been deactivated. Please contact your administrator.",
            })
          }
          const data = {
            ...user,
            role: allowedEmail.role,
            isActive: allowedEmail.isActive,
          }
          return {
            data,
          }
        },
      },
    },
  },
  plugins: [nextCookies()],
  secret: process.env.BETTER_AUTH_SECRET,
});
