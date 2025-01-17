import { getCourseDetails } from "@/queries/courses";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = async ({ params: { id } }) => {
  const course = await getCourseDetails(id);
  console.log("🚀 ~ SingleCoursePage ~ course:", course);

  return (
    <>
      <CourseDetailsIntro />

      <CourseDetails />

      <Testimonials />

      <RelatedCourses />
    </>
  );
};
export default SingleCoursePage;
