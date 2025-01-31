import { getLesson } from "@/queries/lessons";
import { LessonModal } from "../../_components/lesson-modal";

export default async function LessonEdit({
  params: { courseId, moduleId, lessonId },
}) {
  const lesson = await getLesson(lessonId);

  return (
    <LessonModal
      open={true}
      courseId={courseId}
      moduleId={moduleId}
      lesson={lesson}
    />
  );
}
