import React from "react";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import { styled } from "nativewind";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import bgBlur from "../src/assets/bg-blur.png";
import Logo from "../src/assets/logo.svg";
import Stripes from "../src/assets/stripes.svg";
import { api } from "../src/lib/api";
import { useRouter } from "expo-router";

const StyledStripes = styled(Stripes);

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/077920a0f526df5cf6a2",
};

export default function App() {
  const router = useRouter();

  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: "077920a0f526df5cf6a2",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "marcos.dev.nlwspacetime",
      }),
    },
    discovery
  );

  async function handleGithubOAuthCode(code: string) {
    const response = await api.post("/v1/register", {
      code,
    });

    const { token } = response.data;

    await SecureStore.setItemAsync("auth-token", token);

    router.push("/memories");
  }

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      handleGithubOAuthCode(code);
    }
  }, [response]);

  if (!hasLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={bgBlur}
      className="flex-1 relative justify-center bg-gray-900 px-8 py-10"
      imageStyle={{
        position: "absolute",
        left: "-100%",
      }}
    >
      <StyledStripes className="absolute left-2" />

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

      <StatusBar style="light" translucent />
    </ImageBackground>
  );
}
