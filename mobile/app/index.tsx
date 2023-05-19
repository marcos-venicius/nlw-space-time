import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { useRouter } from "expo-router";
import Logo from "../src/assets/logo.svg";
import { api } from "../src/lib/api";
import { githubKeys } from "../src/lib/github-keys";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${githubKeys.clientId}`,
};

export default function App() {
  const router = useRouter();

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: githubKeys.clientId,
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "marcos.dev.nlwspacetime",
      }),
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    try {
      const response = await api.post("/v1/register", {
        code,
      });

      const { token } = response.data;

      await SecureStore.setItemAsync("auth-token", token);

      router.push("/memories");
    } catch (err) {
      console.log({ ...err });
      console.error(err);
    }
  }

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  return (
    <View className="flex-1 px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />

        <View className="space-y-2">
          <Text className="font-title text-center text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>

          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => signInWithGithub()}
          className="rounded-full bg-green-500 px-5 py-3"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black leading-none">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
    </View>
  );
}
