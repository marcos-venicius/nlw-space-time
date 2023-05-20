import { ViewMemory } from "@/components/view-memory";
import { api } from "@/lib/api";
import { ChevronLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const token = cookies().get("auth-token")?.value;

  const { data: memory } = await api.get<app.dto.UniqueMemory>(
    `/v1/memories/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <section className="flex max-h-screen flex-col gap-4 overflow-auto p-16">
      <Link
        href="/"
        className="flex items-center text-sm gap-1 text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>

      <ViewMemory memory={memory} />
    </section>
  );
}
