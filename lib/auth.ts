import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
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
      collegeId: {
        type: "string",
        required: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Skip AllowedEmail check for college users (created server-side by admin)
          if (user.role === "COLLEGE") {
            return { data: user };
          }

          // check if email is in allowed list
          const allowedEmail = await prisma.allowedEmail.findUnique({
            where: { email: user.email },
          });

          if (!allowedEmail) {
            throw new APIError("UNAUTHORIZED", {
              message:
                "Unauthorized: Access restricted. Please contact your administrator.",
            });
          }

          if (!allowedEmail.isActive) {
            throw new APIError("FORBIDDEN", {
              message:
                "Account Disabled: Your account has been deactivated. Please contact your administrator.",
            });
          }
          const data = {
            ...user,
            role: allowedEmail.role,
            isActive: allowedEmail.isActive,
          };
          return {
            data,
          };
        },
      },
    },
  },
  plugins: [nextCookies(), username()],
  secret: process.env.BETTER_AUTH_SECRET,
});
