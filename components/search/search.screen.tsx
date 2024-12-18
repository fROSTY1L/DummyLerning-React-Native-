import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CoursesType } from "@/types/courses";
import { coursesData } from "@/constants/constants";
import CourseCard from "@/components/cards/course.card";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [searchedCourses, setSearchedCourses] = useState<CoursesType[]>([]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length !== 0) {
      const filteredCourses = coursesData.filter((course) =>
        course.name.toLowerCase().includes(text.toLowerCase()) ||
        course.tags.toLowerCase().includes(text.toLowerCase())
      );
      setSearchedCourses(filteredCourses);
    } else {
      setSearchedCourses([]);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1, paddingTop: 45 }}>
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Поиск курсов..."
          value={search}
          onChangeText={handleSearch}
          style={{
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 8,
            fontSize: 16,
            fontFamily: "Nunito_600SemiBold",
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          {searchedCourses.map((item) => (
            <CourseCard key={item._id} item={item} />
          ))}
          {search && searchedCourses.length === 0 && (
            <Text style={{ 
              textAlign: "center", 
              marginTop: 20, 
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            }}>
              Курсы не найдены
            </Text>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
