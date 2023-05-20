import * as SecureStore from "expo-secure-store";
import { ImagePickerAsset } from "expo-image-picker";
import { api } from "../../lib/api";

// TODO: handle errors

/**
 * upload an image
 * @param image image to be uploaded
 * @returns image uploaded url
 */
export async function uploadImageRequest(image: ImagePickerAsset) {
  const token = await SecureStore.getItemAsync("auth-token");

  const formData = new FormData();

  formData.append("file", {
    name: image.fileName || "image.jpg",
    uri: image.uri,
    type: image.type || "image/jpeg",
  } as any);

  const response = await api.post<string>("/v1/image-upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
