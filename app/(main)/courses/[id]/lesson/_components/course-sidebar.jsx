import { CourseProgress } from "@/components/course-progress";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getCourseDetails } from "@/queries/courses";
import { getAReport } from "@/queries/reports";
import { getCourseTestimonialByUser } from "@/queries/testimonials";
import dbConnect from "@/service/mongo";
import { DownloadCertificate } from "./download-certificate";
import { GiveReview } from "./give-review";
import { Quiz } from "./quiz";
import { SidebarModules } from "./sidebar-modules";

export const CourseSidebar = async ({ courseId }) => {
  const course = await getCourseDetails(courseId);
  const loggedinUser = await getLoggedInUser();

  const report = await getAReport({
    course: courseId,
    student: loggedinUser.id,
  });

  const totalCompletedModules = report?.totalCompletedModeules
    ? report?.totalCompletedModeules.length
    : 0;
  const totalModules = course?.modules ? course.modules.length : 0;

  const totalProgress =
    totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

  await dbConnect();

  const updatedModules = await Promise.all(
    course?.modules.map(async (module) => {
      const moduleId = module._id.toString();
      const lessons = module?.lessonIds;

      const updatedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson._id.toString();
          const watch = await Watch.findOne({
            lesson: lessonId,
            module: moduleId,
            user: loggedinUser.id,
          }).lean();
          if (watch?.state === "completed") {
            console.log(`This lesson ${lesson.title} has completed`);
            lesson.state = "completed";
          }
          return lesson;
        })
      );
      return module;
    })
  );

  console.log(updatedModules);

  const testinomial = await getCourseTestimonialByUser(
    courseId,
    loggedinUser?.id
  );

  const quizSet = course?.quizSet;
  const isQuizComplete = report?.quizAssessment ? true : false;

  console.log({ quizSet });
  console.log({ isQuizComplete });

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">{course?.title}</h1>
          <div className="mt-10">
            <CourseProgress variant="success" value={totalProgress} />
          </div>
        </div>

        <SidebarModules courseId={courseId} modules={updatedModules} />
        <div className="w-full px-4 lg:px-14 pt-10 border-t">
          {quizSet && (
            <Quiz
              courseId={courseId}
              quizSet={quizSet}
              isTaken={isQuizComplete}
            />
          )}
        </div>

        <div className="w-full px-6">
          <DownloadCertificate
            courseId={courseId}
            totalProgress={totalProgress}
          />
          <GiveReview courseId={courseId} testinomial={testinomial} />
        </div>
      </div>
    </>
  );
};
