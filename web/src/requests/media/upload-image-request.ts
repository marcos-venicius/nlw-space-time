import { api } from "@/lib/api";
import { getBrowserCookies } from "@/utils/get-browser-cookies";

// TODO: handle errors
export async function uploadImageRequest(file: File) {
  const { ["auth-token"]: token } = getBrowserCookies();

  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<string>("/v1/image-upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
