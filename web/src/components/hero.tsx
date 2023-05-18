import { cookies } from "next/headers";
import logo from "../assets/logo.svg";
import Image from "next/image";

export function Hero() {
  const isAuthenticated = cookies().get("auth-token");

  return (
    <div className="space-y-5">
      <Image src={logo} alt="NLW spacetime logo" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="font-sans text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>

        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <a
        href={
          isAuthenticated
            ? "#"
            : `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
        }
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600 transition-colors"
      >
        {isAuthenticated ? "CADASTRAR LEMBRANÇA" : "ENTRAR COM GITHUB"}
      </a>
    </div>
  );
}
