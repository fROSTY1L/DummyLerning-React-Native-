import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function SearchInput({ homeScreen }: { homeScreen?: boolean }) {
  const handleNavigate = () => {
    router.push("/(tabs)/search");
  };

  return (
    <View style={{ marginHorizontal: 16, marginVertical: 10 }}>
      {homeScreen ? (
        <TouchableOpacity
          onPress={handleNavigate}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 45,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons name="search-outline" size={24} color={"#000"} />
          <TextInput
            editable={false}
            placeholder="Поиск курсов..."
            style={{
              flex: 1,
              height: "100%",
              marginLeft: 10,
              fontFamily: "Nunito_600SemiBold",
              color: "#8B8B8B",
            }}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 45,
            borderRadius: 8,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons name="search-outline" size={24} color={"#000"} />
          <TextInput
            placeholder="Поиск курсов..."
            style={{
              flex: 1,
              height: "100%",
              marginLeft: 10,
              fontFamily: "Nunito_600SemiBold",
            }}
          />
        </View>
      )}
    </View>
  );
}
