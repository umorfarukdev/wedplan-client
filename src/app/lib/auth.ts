import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("weding-plan");

const SELF_ASSIGNABLE_ROLES = ["customer", "vendor"];

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "customer",
        input: true,
      },
      businessName: {
        type: "string",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      city: {
        type: "string",
        required: false,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
      subscriptionPlan: {
        type: "string",
        required: false,
        defaultValue: "free",
        input: false,
      },
      subscriptionExpiresAt: {
        type: "date",
        required: false,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = String(user.role || "customer").toLowerCase();

          return {
            data: {
              ...user,
              role: SELF_ASSIGNABLE_ROLES.includes(role) ? role : "customer",
            },
          };
        },
      },
      update: {
        before: async (user) => {
          if (user.role === undefined) {
            return;
          }

          const role = String(user.role).toLowerCase();

          // Roles are never self-assigned through the public auth API.
          if (!SELF_ASSIGNABLE_ROLES.includes(role)) {
            return false;
          }

          return { data: { ...user, role } };
        },
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
