import { Hero } from "@/components/hero";
import { Profile } from "@/components/profile";
import { Signin } from "@/components/signin";
import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";
import { Copyright } from "@/components/copyright";
import { cookies } from "next/headers";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "fallback",
});
const baiJamjuree = BaiJamjuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree",
});

export const metadata = {
  title: "Linha do tempo",
  description:
    "Uma cápsula do tempo construida com React, NextJS, TailwindCSS e Typescript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = cookies().has("auth-token");

  return (
    <html lang="pt-BR" className={`${roboto.variable} ${baiJamjuree.variable}`}>
      <body className="font-sans text-gray-100 bg-gray-900">
        <main className="grid grid-cols-2 min-h-screen">
          <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[288px] w-[526px] bg-purple-700 rounded-full opacity-50 blur-full" />

            <div className="absolute right-2 top-0 bottom-0 w-2 bg-stripes" />

            {isAuthenticated ? <Profile /> : <Signin />}

            <Hero />

            <Copyright />
          </div>

          <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
