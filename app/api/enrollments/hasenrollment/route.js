import { auth } from "@/auth";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse(`You are not authenticated!`, {
      status: 401,
    });
  }

  const { courseId } = await request.json();

  try {
    const user = await getUserByEmail(session?.user?.email);

    const hasEnrollment = await hasEnrollmentForCourse(courseId, user?.id);

    return new NextResponse(JSON.stringify(hasEnrollment), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
