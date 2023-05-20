import { NewMemoryForm } from "@/components/new-memory-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <section className="flex min-h-full flex-col gap-4 overflow-auto p-16">
      <Link
        href="/"
        className="flex items-center text-sm gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <NewMemoryForm />
    </section>
  );
}
