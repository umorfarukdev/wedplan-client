import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("weding-plan");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        required: false,
        input: true,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
