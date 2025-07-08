import { db } from "@/config/db";
import { courseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");

  const user = await currentUser();
  if (courseId == 0) {
  const result = await db
    .select()
    .from(courseTable)
    .where(sql`${courseTable.courseContent}::jsonb != '{}'::jsonb`);
  return NextResponse.json(result);
}

  if (courseId) {
    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.cid, courseId));

    // console.log(result);
    

    const safeResult = JSON.parse(JSON.stringify(result[0]));
    return NextResponse.json(safeResult);
  } else {
    const result = await db
      .select()
      .from(courseTable)
      .where(eq(courseTable.userEmail, user.primaryEmailAddress?.emailAddress))
      .orderBy(desc(courseTable.id));

    // console.log(result);

    return NextResponse.json(result);
  }
}
