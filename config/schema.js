import { pgTable, varchar, integer, boolean, json } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }) // ✅ Add length to varchar
});

export const courseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid: varchar({ length: 255 }).notNull().unique(), // ✅ Add length to varchar
  name: varchar({ length: 255 }), // ✅ Add length to varchar
  description: varchar({ length: 1024 }), // optional, use longer length
  noOfChapters: integer().notNull(),
  includeVideo: boolean().default(false),
  level: varchar({ length: 100 }), // ✅ Add length to varchar
  category: varchar({ length: 100 }), // ✅ Add length to varchar
  courseJson: json(),
  bannerImageUrl:varchar().default(""),
  courseContent:json().default({}),
  userEmail: varchar({ length: 255, name: "userEmail" }).references(() => usersTable.email)
});


export const enrollCourseTable = pgTable('enrollCourse',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  cid:varchar('cid').references(()=>courseTable.cid),
  userEmail:varchar('userEmail').references(()=>usersTable.email).notNull(),
  completedChapters:json()
})