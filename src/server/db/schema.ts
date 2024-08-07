// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
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
  (name) => `fmr_master_user_${name}`,
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
    recordIds: varchar("recordsId", { length: 256 }).notNull(),
    stationId: bigint("stationId", { mode: "number" }).notNull(),
    ipAddress: varchar("ipAddress", { length: 256 }),
    startTime: datetime("startTime", { mode: "date", fsp: 6 }).notNull(),
    endTime: datetime("endTime", { mode: "date", fsp: 6 }).notNull(),
    frequncy: varchar("frequncy", { length: 256 }).notNull(),
    dayofweek: varchar("dayofweek", { length: 256 }).notNull(),
    dailyStartTime: time("dailyStartTime", { fsp: 6 }).notNull(),
    dailyEndTime: time("dailyEndTime", { fsp: 6 }).notNull(),
    channel: varchar("channel", { length: 256 }).notNull(),
    bitrates: varchar("bitrates", { length: 256 }).notNull(),
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

//create table for audio output path
export const audioPaths = createTable(
  "audio",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    recordId: varchar("recordId", { length: 256 }).notNull(),
    urls: varchar("urls", { length: 512 }).notNull(),
    stationIds: bigint("stationIds", { mode: "number" }).notNull(),
    frequencies: varchar("frequencies", { length: 256 }).notNull(),
    startTime: datetime("startTime", { mode: "date", fsp: 6 }).notNull(),
    endTime: datetime("endTime", { mode: "date", fsp: 6 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    recordIdIndex: index("record_id_idx").on(example.id),
  }),
);

//create table for audio output path update by remotesite
export const audioPathsRemotes = createTable(
  "audio_record",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    recordsId: varchar("recordsId", { length: 256 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
    ip: varchar("ip", { length: 256 }).notNull(),
    StationID: bigint("StationID", { mode: "number" }).notNull(),
    bitrate: varchar("bitrate", { length: 256 }).notNull(),
    urls: varchar("urls", { length: 512 }).notNull(),
    frequencies: varchar("frequencies", { length: 256 }).notNull(),
    Chanel: varchar("Chanel", { length: 256 }).notNull(),
    startTime: datetime("startTime", { mode: "date", fsp: 6 }).notNull(),
    endTime: datetime("endTime", { mode: "date", fsp: 6 }).notNull(),
  },
  (example) => ({
    recordIdIndex: index("record_id_idx").on(example.id),
  }),
);

export const recordRelations = relations(records, ({ many }) => ({
  audioPaths: many(audioPaths, {
    fields: [records.recordIds],
    references: [audioPaths.recordId],
  }),
}));

//relation with `record` id table one to many relation , One record can have multiple audioPaths
export const audioRelation = relations(audioPaths, ({ one }) => ({
  record: one(records, {
    fields: [audioPaths.recordId],
    references: [records.recordIds],
  }),
}));
