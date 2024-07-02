// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  datetime,
  index,
  mysqlTableCreator,
  time,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator(
  (name) => `fmr-master-user_${name}`,
);

export const users = createTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    userId: varchar("userId", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    role: varchar("role", { length: 256 }),
    email: varchar("email", { length: 256 }),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const records = createTable(
  "record",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    stationId: bigint("stationId", { mode: "number" }).notNull(),
    ipAddress: varchar("ipAddress", { length: 256 }),
    startTime: datetime("startTime", { mode: "date", fsp: 6 }).notNull(),
    endTime: datetime("endTime", { mode: "date", fsp: 6 }).notNull(),
    frequncy: varchar("frequncy", { length: 256 }).notNull(),
    dayofweek: varchar("dayofweek", { length: 256 }).notNull(),
    dailyStartTime: time("dailyStartTime", { fsp: 6 }).notNull(),
    dailyEndTime: time("dailyEndTime", { fsp: 6 }).notNull(),
    userId: varchar("userId", { length: 256 }).notNull(),
    username: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },

  (example) => ({
    stationIdIndex: index("station_id_idx").on(example.stationId),
    userIdIndex: index("user_id_idx").on(example.userId),
  }),
);
