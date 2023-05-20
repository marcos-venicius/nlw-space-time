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

  await api.post(`/v1/memories`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
