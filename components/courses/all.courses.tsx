import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import CourseCard from "@/components/cards/course.card";
import { coursesData } from "@/constants/constants";

export default function AllCourses() {
  const handleSeeAll = () => {
    router.push("/(tabs)/courses");
  };

  return (
    <View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginTop: 20,
      }}>
        <Text style={{
          fontSize: 20,
          fontFamily: "Raleway_700Bold",
        }}>
          Популярные курсы
        </Text>
        <TouchableOpacity onPress={handleSeeAll}>
          <Text style={{
            color: "#2467EC",
            fontSize: 16,
            fontFamily: "Nunito_600SemiBold",
          }}>
            Все курсы
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 15 }}>
        {coursesData.slice(0, 4).map((item, index) => (
          <CourseCard item={item} key={index} />
        ))}
      </View>
    </View>
  );
}
