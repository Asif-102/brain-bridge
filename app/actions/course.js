"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import dbConnect from "@/service/mongo";

export async function createCourse(data) {
  try {
    const loggedinUser = await getLoggedInUser();
    data["instructor"] = loggedinUser?.id;
    const course = await create(data);
    return course;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateCourse(courseId, dataToUpdate) {
  try {
    await dbConnect();

    await Course.findByIdAndUpdate(courseId, dataToUpdate);
  } catch (e) {
    throw new Error(e);
  }
}
