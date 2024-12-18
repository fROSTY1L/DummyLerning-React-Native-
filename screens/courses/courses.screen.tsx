import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { CoursesType } from '@/types/courses';
import { LinearGradient } from "expo-linear-gradient";
import CourseCard from "@/components/cards/course.card";
import { coursesData } from "@/constants/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CoursesScreen() {
  const [courses, setCourses] = useState<CoursesType[]>(coursesData);
  const [activeCategory, setActiveCategory] = useState("Все");

  // Категории с маппингом на английские значения
  const categories = [
    { title: "Все", value: "all" },
    { title: "Программирование", value: "programming" },
    { title: "Дизайн", value: "design" },
    { title: "Бизнес", value: "business" },
  ];

  const handleCategories = (category: { title: string, value: string }) => {
    setActiveCategory(category.title);
    if (category.value === "all") {
      setCourses(coursesData);
    } else {
      const filterCourses = coursesData.filter(
        (course: CoursesType) => course.categories === category.value
      );
      setCourses(filterCourses);
    }
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: hp("8%") }}
    >
      <View style={{ padding: wp("2%") }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: wp("2.5%"),
                backgroundColor:
                  activeCategory === category.title ? "#2467EC" : "#000",
                borderRadius: wp("10%"),
                paddingHorizontal: wp("5%"),
                marginHorizontal: index === 0 ? 0 : wp("2%"),
              }}
              onPress={() => handleCategories(category)}
            >
              <Text style={{ 
                color: "#fff", 
                fontSize: wp("4%"),
                fontFamily: "Nunito_600SemiBold"
              }}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView style={{ marginHorizontal: wp("4%"), gap: wp("3%") }}>
          {courses.map((item: CoursesType, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
          {courses.length === 0 && (
            <Text style={{ 
              textAlign: "center", 
              paddingTop: hp("5%"), 
              fontSize: wp("4%"),
              fontFamily: "Nunito_600SemiBold"
            }}>
              Курсы не найдены
            </Text>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
