import { api } from "@/lib/api";

type CreateMemoryRequest = {
  content: string;
  coverUrl: string;
  isPublic: boolean;
};

export async function createMemoryRequest(data: CreateMemoryRequest) {
  // TODO: handle errors

  await api.post(`/v1/memories`, data);
}
