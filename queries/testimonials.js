import { Testimonial } from "@/model/testimonial-model";

import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { User } from "@/model/user-model";
import dbConnect from "@/service/mongo";

export async function getTestimonialsForCourse(courseId) {
  await dbConnect();

  const testimonials = await Testimonial.find({ courseId: courseId })
    .populate({
      path: "user",
      model: User,
    })
    .lean();
  return replaceMongoIdInArray(testimonials);
}

export async function create(testimonialData) {
  try {
    await dbConnect();

    const testimonial = await Testimonial.create(testimonialData);
    return JSON.parse(JSON.stringify(testimonial));
  } catch (err) {
    throw new Error(err);
  }
}

export async function getCourseTestimonialByUser(courseId, userId) {
  await dbConnect();

  const testinomial = await Testimonial.findOne({
    courseId: courseId,
    user: userId,
  }).lean();
  return replaceMongoIdInObject(testinomial);
}
