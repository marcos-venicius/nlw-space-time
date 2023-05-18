import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function Memories() {
  return (
    <View className="flex-1 justify-center items-center bg-gray-900">
      <Text className="text-gray-50">Memories</Text>

      <StatusBar translucent style="light" />
    </View>
  );
}
