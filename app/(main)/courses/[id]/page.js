import { getCourseDetails } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
// import RelatedCourses from "./_components/RelatedCourses";
import { getTestimonialsForCourse } from "@/queries/testimonials";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
  // console.log("🚀 ~ SingleCoursePage ~ course:", course);

  const testimonials = await getTestimonialsForCourse(id);

  return (
    <>
      <CourseDetailsIntro course={course} />

      <CourseDetails course={course} />

      {testimonials?.length > 0 && <Testimonials testimonials={testimonials} />}

      {/* <RelatedCourses /> */}
    </>
  );
};
export default SingleCoursePage;
