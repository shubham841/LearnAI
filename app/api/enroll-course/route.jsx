import { and, desc, eq } from "drizzle-orm";
import { courseTable, enrollCourseTable } from "../../../config/schema";
import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  if (!user || !user.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.primaryEmailAddress.emailAddress;

  // Check if course already enrolled
  const enrollCourses = await db
    .select()
    .from(enrollCourseTable)
    .where(
      and(
        eq(enrollCourseTable.userEmail, email),
        eq(enrollCourseTable.cid, courseId)
      )
    );

  if (enrollCourses.length === 0) {
    const result = await db
      .insert(enrollCourseTable)
      .values({
        cid: courseId,
        userEmail: email,
      })
      .returning();

    return NextResponse.json(result);
  }

  return NextResponse.json({ resp: "Already enrolled" });
}

export async function GET(req) {
  const user = await currentUser();
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const email = user.primaryEmailAddress.emailAddress;

    const result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(
        and(
          eq(enrollCourseTable.userEmail, email),
          eq(enrollCourseTable.cid, courseId)
        )
      );
    console.log("result", result);
    return NextResponse.json(result[0]);
  } else {
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    const result = await db
      .select()
      .from(courseTable)
      .innerJoin(enrollCourseTable, eq(courseTable.cid, enrollCourseTable.cid))
      .where(eq(enrollCourseTable.userEmail, email))
      .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
  }
}

export async function PUT(req) {
  const { completedChapter, courseId } = await req.json();
  const user = await currentUser();

  const result = await db
    .update(enrollCourseTable)
    .set({
      completedChapters: completedChapter,
    })
    .where(
      and(
        eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)
      )
    )
    .returning(enrollCourseTable);

  return NextResponse.json(result);
}
