import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";

export const people = sqliteTable("people", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const schedules = sqliteTable("schedules", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  startAt: text("start_at").notNull(),
  endAt: text("end_at").notNull(),
  note: text("note").notNull().default(""),
});

export const attendees = sqliteTable("attendees", {
  scheduleId: text("schedule_id").notNull().references(() => schedules.id, { onDelete: "cascade" }),
  personId: text("person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
}, (table) => [primaryKey({ columns: [table.scheduleId, table.personId] })]);

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
