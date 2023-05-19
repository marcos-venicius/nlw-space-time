import { BaiJamjuree_700Bold } from "@expo-google-fonts/bai-jamjuree";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import * as SecureStore from "expo-secure-store";
import { ImageBackground } from "react-native";

import { useFonts } from "expo-font";
import bgBlur from "../src/assets/bg-blur.png";
import Stripes from "../src/assets/stripes.svg";
import { Stack } from "expo-router";
import React from "react";

const StyledStripes = styled(Stripes);

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );

  const [hasLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  React.useEffect(() => {
    SecureStore.getItemAsync("auth-token").then((token) =>
      setIsAuthenticated(!!token)
    );
  }, []);

  if (!hasLoaded || isAuthenticated === null) {
    return (
      <>
        <StatusBar style="light" translucent />

        <ImageBackground
          source={bgBlur}
          className="flex-1 relative justify-center bg-gray-900 px-8 py-10"
          imageStyle={{
            position: "absolute",
            left: "-100%",
          }}
        >
          <StyledStripes className="absolute left-2" />
        </ImageBackground>
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" translucent />

      <ImageBackground
        source={bgBlur}
        className="flex-1 relative justify-center bg-gray-900"
        imageStyle={{
          position: "absolute",
          left: "-100%",
        }}
      >
        <StyledStripes className="absolute left-2" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
          <Stack.Screen name="index" redirect={isAuthenticated} />
          <Stack.Screen name="new-memory" />
          <Stack.Screen name="memories" />
        </Stack>
      </ImageBackground>
    </>
  );
}
