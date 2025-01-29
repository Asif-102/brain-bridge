/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const ImageForm = ({ initialData, courseId }) => {
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      uploadFile();
    }
  }, [file]);

  const uploadFile = async () => {
    try {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file[0].type)) {
        throw new Error("Only image files (JPEG, PNG, GIF, WEBP) are allowed.");
      }

      // Validate file size (e.g., 1 MB limit)
      const maxFileSize = 1 * 1024 * 1024; // 1 MB in bytes
      if (file[0].size > maxFileSize) {
        throw new Error("File size must be less than 1 MB.");
      }

      const formData = new FormData();
      formData.append("files", file[0]);
      formData.append("courseId", courseId);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const result = await response.json();
      const newImageUrl = result.url; // URL returned by Vercel Blob

      // Update the image URL in the UI
      setImageUrl(newImageUrl);
      toast.success("File uploaded successfully!");
      toggleEdit();
      router.refresh(); // Refresh the page to reflect changes
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.message);
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={imageUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadDropzone onUpload={(file) => setFile(file)} />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
