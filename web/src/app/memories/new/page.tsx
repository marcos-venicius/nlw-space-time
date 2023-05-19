import { MediaPicker } from "@/components/media-picker";
import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex min-h-full flex-col gap-4 overflow-auto">
      <Link
        href="/"
        className="flex items-center text-sm gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <form className="h-full flex-col gap-5 flex">
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
      </form>
    </section>
  );
}
