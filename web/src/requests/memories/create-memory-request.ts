import { api } from "@/lib/api";
import { getBrowserCookies } from "@/utils/get-browser-cookies";

type CreateMemoryRequest = {
  content: string;
  coverUrl: string;
  isPublic: boolean;
};

export async function createMemoryRequest(data: CreateMemoryRequest) {
  const { ["auth-token"]: token } = getBrowserCookies();

  // TODO: handle errors

  const response = await api.post<string>(`/v1/memories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
