"use client";

import { ImageFallback } from "../image-fallback";
import notFoundImage from "../../assets/not-found.svg";

type Props = {
  memory: app.dto.UniqueMemory;
};

export function ViewMemory({ memory }: Props) {
  return (
    <div className="flex-col gap-5 flex">
      <div className="flex items-center gap-4">
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
        src={memory.coverUrl}
        width={960}
        height={540}
        className="aspect-video w-full rounded-lg object-cover"
        fallback={notFoundImage}
        alt=""
      />

      <p className="focus:ring-0 h-80 w-full max-w-[1000px] flex-1 resize-none rounded border-0 bg-transparent p-1 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 mt-2">
        {memory.content}
      </p>
    </div>
  );
}
