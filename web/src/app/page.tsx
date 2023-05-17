import { Copyright } from "@/components/copyright";
import { Hero } from "@/components/hero";
import { Signin } from "@/components/signin";
import { EmptyMemories } from "@/components/empty-memories";

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[288px] w-[526px] bg-purple-700 rounded-full opacity-50 blur-full" />

        <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

        <Signin />

        <Hero />

        <Copyright />
      </div>

      <div className="flex flex-col p-16 bg-[url(../assets/bg-stars.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  );
}
