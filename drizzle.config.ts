// import { type Config } from "drizzle-kit";

// import { env } from "~/env";

// export default {
//   schema: "./src/server/db/schema.ts",
//   dialect: 'mysql',
//   driver: "mysql2",
//   dbCredentials: {
//     uri: env.DATABASE_URL,
//   },
//   tablesFilter: ["fmr-master-app_*"],
// } satisfies Config;

import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  out: "./drizzle",
  verbose: true,
  strict: true,
});
