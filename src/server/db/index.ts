// import { drizzle } from "drizzle-orm/mysql2";
// import { createPool, type Pool } from "mysql2/promise";

// import { env } from "~/env";
// import * as schema from "./schema";

// /**
//  * Cache the database connection in development. This avoids creating a new connection on every HMR
//  * update.
//  */
// const globalForDb = globalThis as unknown as {
//   conn: Pool | undefined;
// };

// const conn = globalForDb.conn ?? createPool({ uri: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// export const db = drizzle(conn, { schema, mode: "default" });

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "172.16.202.63",
  user: "thaipbs",
  password: "thaipbs",
  database: "fmr-master-user",
  port: 3306,
});

import * as schema from "./schema";

// Use this object to send drizzle queries to your DB
export const db = drizzle(connection, { schema, mode: "default" });

export default db;


