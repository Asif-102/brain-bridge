import imageCompression from "browser-image-compression";

// Allowed image types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const compressImage = async (
  imageFile,
  maxSizeMB = 0.15,
  maxWidthOrHeight = 1280
) => {
  // Check if the file is an image
  if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
    throw new Error(
      "Invalid file type. Please upload a JPEG, PNG, GIF, or WEBP image."
    );
  }

  const options = {
    maxSizeMB, // Default: 150KB
    maxWidthOrHeight, // Resize to fit within 1280px width/height
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Image compression failed");
  }
};
