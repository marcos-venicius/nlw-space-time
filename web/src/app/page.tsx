import { EmptyMemories } from "@/components/empty-memories";
import { ImageFallback } from "@/components/image-fallback";
import { api } from "@/lib/api";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { cookies } from "next/headers";

import notFoundImage from "../assets/not-found.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

dayjs.locale(ptBR);

export default async function Home() {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    return <EmptyMemories />;
  }

  const { data: memories } = await api.get<Array<app.dto.MemoryListItem>>(
    "/v1/memories",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <ul className="flex flex-col flex-1 gap-10 p-8 list-none overflow-y-auto max-h-screen">
      {memories.map((memory) => (
        <li key={memory.id} className="space-y-4">
          <div className="flex w-full items-center justify-between">
            <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
            </time>

            {memory.isPublic ? (
              <span className="px-2 py-1 rounded-lg text-xs text-yellow-600 border border-yellow-950">
                público
              </span>
            ) : (
              <span className="px-2 py-1 rounded-lg text-xs text-green-600 border border-green-950">
                privado
              </span>
            )}
          </div>

          <ImageFallback
            quality={100}
            fallback={notFoundImage}
            src={memory.coverUrl}
            alt=""
            width={512}
            height={288}
            className="aspect-video w-full rounded-lg object-cover"
          />

          <p className="w-full text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>

          <Link
            href={`/memories/${memory.id}/view`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100 transition-colors"
          >
            Ler mais <ArrowRight className="w-4 h-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
