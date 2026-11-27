const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return `${file.name}: Only PNG, JPG and WebP are allowed.`;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return `${file.name}: Image size must be under 5MB.`;
  }

  return null;
}

/**
 * Upload a single image to ImgBB and return its public URL.
 */
export async function uploadImageToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  if (!apiKey) {
    throw new Error("ImgBB API key is missing.");
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error("Image upload failed.");
  }

  return data.data.url;
}
