import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourses from "./_components/RelatedCourses";
import Testimonials from "./_components/Testimonials";

const SingleCoursePage = () => {
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
