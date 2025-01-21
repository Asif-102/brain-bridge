import { Enrollment } from "@/model/enrollment-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import dbConnect from "@/service/mongo";

export async function getEnrollmentsForCourse(courseId) {
  await dbConnect();

  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}

export async function enrollForCourse(courseId, userId, paymentMethod) {
  const newEnrollment = {
    course: courseId,
    student: userId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: "not-started",
  };

  try {
    await dbConnect();

    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
