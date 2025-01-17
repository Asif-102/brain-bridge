import { Enrollment } from "@/model/enrollment-model";

import { replaceMongoIdInArray } from "@/lib/convertData";
import dbConnect from "@/service/mongo";

export async function getEnrollmentsForCourse(courseId) {
  await dbConnect();

  const enrollments = await Enrollment.find({ course: courseId }).lean();
  return replaceMongoIdInArray(enrollments);
}
