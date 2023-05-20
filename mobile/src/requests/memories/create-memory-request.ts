import * as SecureStore from "expo-secure-store";
import { api } from "../../lib/api";

export type CreateMemoryRequest = {
  isPublic: boolean;
  coverUrl: string;
  content: string;
};

// TODO: handle errors
/**
 * create a new memory
 * @param data memory data
 * @returns created memory id
 */
export async function createMemoryRequest(data: CreateMemoryRequest) {
  const token = await SecureStore.getItemAsync("auth-token");

  const response = await api.post<string>("/v1/memories", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
