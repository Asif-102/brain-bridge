"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Testimonial } from "@/model/testimonial-model";
import { create } from "@/queries/testimonials";
import dbConnect from "@/service/mongo";

export async function createTestimonial(data) {
  try {
    const content = data.get("content");
    const rating = data.get("rating");
    const courseId = data.get("courseId");
    const loggedinUser = await getLoggedInUser();

    const testimonial = await create({
      content,
      user: loggedinUser?.id,
      courseId,
      rating,
    });

    return testimonial;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateTestimonial(testimonialId, data) {
  try {
    await dbConnect();

    await Testimonial.findByIdAndUpdate(testimonialId, data);
  } catch (err) {
    throw new Error(err);
  }
}
