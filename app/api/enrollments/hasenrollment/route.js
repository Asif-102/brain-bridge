import { User } from "@/model/user-model";
import { hasEnrollmentForCourse } from "@/queries/enrollments";
import dbConnect from "@/service/mongo";

import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { courseId, email } = await request.json();

  try {
    await dbConnect();

    const user = await User.findOne({ email });

    const hasEnrollment = await hasEnrollmentForCourse(courseId, user?.id);

    return new NextResponse(hasEnrollment, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
