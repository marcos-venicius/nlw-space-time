import { Link, useRouter } from "expo-router";
import Logo from "../src/assets/logo.svg";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import {
  ImageBackground,
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
import { uploadImageRequest } from "../src/requests/media/upload-image-request";
import { createMemoryRequest } from "../src/requests/memories/create-memory-request";

export default function NewMemory() {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();

  // TODO: migrate to react hook form
  const [coverImage, setCoverImage] =
    React.useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isPublic, setIsPublic] = React.useState(false);
  const [content, setContent] = React.useState("");

  // TODO: handle errors
  async function handlOnSubmit() {
    let coverUrl = "";

    if (coverImage) {
      coverUrl = await uploadImageRequest(coverImage);
    }

    await createMemoryRequest({
      content: content || "(empty)",
      coverUrl,
      isPublic,
    });

    router.push("/memories");
  }

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage(result.assets[0]);
    }
  }

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
          onPress={openImagePicker}
          className="overflow-hidden w-full rounded-lg border border-dashed border-gray-500 bg-black/20 aspect-video"
          android_ripple={{
            color: "#372560",
            borderless: true,
          }}
        >
          {coverImage ? (
            <ImageBackground
              source={coverImage}
              resizeMode="cover"
              className="flex-1"
            >
              <View className="fflex flex-row gap-2 flex-1 bg-black/20 justify-center items-center">
                <Feather name="image" color="#ffffff" size={16} />

                <Text className="font-body text-sm text-white">
                  Alterar imagem de capa
                </Text>
              </View>
            </ImageBackground>
          ) : (
            <View className="flex-1 flex-row justify-center items-center gap-2">
              <Feather name="image" color="#ffffff" size={16} />

              <Text className="font-body text-sm text-gray-200">
                Adicionar imagem de capa
              </Text>
            </View>
          )}
        </Pressable>

        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
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
          onPress={handlOnSubmit}
        >
          <Text className="font-alt text-sm uppercase text-black leading-none">
            salvar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
