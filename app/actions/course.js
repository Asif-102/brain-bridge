"use server";

import { create } from "@/queries/courses";

export async function createCourse(data) {
  try {
    const course = await create(data);
    return course;
  } catch (err) {
    throw new Error(err);
  }
}
