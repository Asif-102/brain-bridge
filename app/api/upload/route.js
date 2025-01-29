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

    // Get the current course details
    const course = await getCourseDetails(courseId);

    // If the course already has a thumbnail, delete it from Vercel Blob
    if (course?.thumbnail) {
      try {
        await del(course.thumbnail); // Delete the existing thumbnail
        console.log("Deleted old thumbnail:", course.thumbnail);
      } catch (error) {
        console.error("Error deleting old thumbnail:", error);
        // Continue even if deletion fails (e.g., file might not exist)
      }
    }

    // Upload the new file to Vercel Blob
    const { url } = await put(file.name, file, {
      access: "public", // Make the file publicly accessible
    });

    // Update the course with the new image URL
    await updateCourse(courseId, { thumbnail: url });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
