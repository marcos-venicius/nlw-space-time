"use client";

import { Camera } from "lucide-react";
import { MediaPicker } from "../media-picker";
import { FormEvent } from "react";
import { uploadImageRequest } from "@/requests/media/upload-image-request";
import { createMemoryRequest } from "@/requests/memories/create-memory-request";
import { useRouter } from "next/navigation";

export function NewMemoryForm() {
  const router = useRouter();

  // TODO: MIGRATE TO USE HOOK FORM

  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    // TODO: validate all fields and show error messages

    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fileToUpload = formData.get("attach-media");

    let coverUrl = "";

    if (fileToUpload) {
      coverUrl = await uploadImageRequest(fileToUpload as File);
    }

    const createdId = await createMemoryRequest({
      content: formData.get("content") as string,
      coverUrl,
      isPublic: formData.has("is-public"),
    });

    router.push(`/memories/${createdId}/view`);
  }

  return (
    <form className="h-full flex-col gap-5 flex" onSubmit={handleOnSubmit}>
      <div className="flex items-center gap-4">
        <label
          htmlFor="attach-media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors select-none"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="is-public"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100 transition-colors select-none"
        >
          <input
            type="checkbox"
            name="is-public"
            id="is-public"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker id="attach-media" accept="image/*" />

      <textarea
        name="content"
        spellCheck={false}
        className="focus:ring-0 h-80 w-full max-w-[1000px] flex-1 resize-none rounded border-0 bg-transparent p-1 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 mt-2"
        placeholder="Fique livre para adicionar fotos, e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 transition-colors self-end">
        salvar
      </button>
    </form>
  );
}
