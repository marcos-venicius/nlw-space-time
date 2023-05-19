import { Link } from "expo-router";
import Logo from "../src/assets/logo.svg";
import { Feather } from "@expo/vector-icons";
import {
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets();
  const [isPublic, setIsPublic] = React.useState(false);

  return (
    <ScrollView
      className="flex-1 px-8 mt-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: bottom + 20,
        paddingTop: top,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Logo />

        <Link href="/memories" asChild>
          <Pressable
            android_ripple={{
              borderless: true,
              color: "#ffffff30",
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500"
          >
            <Feather name="arrow-left" size={16} color="#ffffff" />
          </Pressable>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? "#764fd0" : "#727275"}
            trackColor={{
              true: "#372560",
              false: "#56565a",
            }}
          />

          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <Pressable
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          android_ripple={{
            color: "#372560",
            borderless: true,
          }}
        >
          <View className="flex-row items-center gap-2">
            <Feather name="image" color="#ffffff" size={16} />

            <Text className="font-body text-sm text-gray-200">
              Adicionar foto de capa
            </Text>
          </View>
        </Pressable>

        <TextInput
          multiline
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          selectionColor={"#764fd0"}
          className="font-body text-lg text-gray-50 leading-relaxed"
          placeholder="Fique livre para adicionar fotos, e relatos sobre essa experiência que você quer lembrar para sempre."
          placeholderTextColor={"#56565a"}
        />

        <TouchableOpacity
          className="rounded-full bg-green-500 px-5 py-3 items-center self-end"
          activeOpacity={0.7}
        >
          <Text className="font-alt text-sm uppercase text-black leading-none">
            salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
