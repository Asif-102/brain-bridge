import { updateCourse } from "@/app/actions/course";
import { getCourseDetails } from "@/queries/courses";
import { del, put } from "@vercel/blob"; // Import the `del` method
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("files");
    const courseId = formData.get("courseId");

    if (!file || !courseId) {
      return new NextResponse("File or courseId not provided", {
        status: 400,
      });
    }

    const course = await getCourseDetails(courseId);

    if (course?.thumbnail) {
      try {
        await del(course.thumbnail);
        console.log("Deleted old thumbnail:", course.thumbnail);
      } catch (error) {
        console.error("Error deleting old thumbnail:", error);
      }
    }

    const { url } = await put(file.name, file, {
      access: "public",
    });

    await updateCourse(courseId, { thumbnail: url });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
