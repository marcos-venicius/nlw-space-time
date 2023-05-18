import { Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex  flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center text-sm gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <form className="form flex-1 flex-col gap-2">
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

        <textarea
          name="content"
          spellCheck={false}
          className="focus:ring-0 w-full max-w-[1000px] h-full flex-1 resize-none rounded border-0 bg-transparent p-1 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 mt-2"
          placeholder="Fique livre para adicionar fotos, e relatos sobre essa experiência que você quer lembrar para sempre."
        />
      </form>

      <input hidden type="file" id="attach-media" accept="image/*" />
    </section>
  );
}
