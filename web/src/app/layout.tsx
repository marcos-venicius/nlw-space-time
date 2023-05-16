import "./globals.css";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
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
  return (
    <html lang="pt-BR">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans text-gray-100 bg-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
