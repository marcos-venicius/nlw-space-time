import { api } from "@/lib/api";

// TODO: handle errors
export async function uploadImageRequest(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<string>("/v1/image-upload", formData);

  return response.data;
}
