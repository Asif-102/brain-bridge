import { updateCourse } from "@/app/actions/course";
import { put } from "@vercel/blob";
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

    // Upload the file to Vercel Blob
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
