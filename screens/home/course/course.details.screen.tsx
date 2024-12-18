import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Raleway_600SemiBold, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_500Medium, Nunito_700Bold, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import CourseLesson from "@/components/courses/course.lesson";
import { CoursesType, PrerequisiteType, BenefitType, ReviewType } from "@/types/courses";
import ReviewCard from "@/components/cards/review.card";
import { useToast } from "react-native-toast-notifications";

export default function CourseDetailScreen() {
  const [activeButton, setActiveButton] = useState("About");
  const [isExpanded, setIsExpanded] = useState(false);
  const { item } = useLocalSearchParams();
  const courseData: CoursesType = JSON.parse(item as string);

  // Демо-данные для проверки покупки
  const isPurchased = global.purchasedCourses?.some(
    (course: CoursesType) => course._id === courseData._id
  ) || false;

  const toast = useToast();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleAddToCart = () => {
    // Получаем текущую корзину из глобального состояния или создаем новую
    let currentCart = global.cart || [];
    
    // Проверяем, есть ли уже этот курс в корзине
    const isItemExist = currentCart.find((item: CoursesType) => item._id === courseData._id);
    
    if (isItemExist) {
      toast.show("Курс уже в корзине", {
        type: "warning",
        placement: "bottom",
        duration: 2000,
      });
      return;
    }

    // Добавляем курс в корзину
    currentCart.push(courseData);
    global.cart = currentCart;

    toast.show("Курс добавлен в корзину", {
      type: "success",
      placement: "bottom",
      duration: 2000,
    });

    // Обновляем счетчик в хедере (если нужно)
    if (global.updateCartCount) {
      global.updateCartCount(currentCart.length);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1, paddingTop: 15 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 16 }}>
          <View style={{
            position: "absolute",
            zIndex: 1,
            backgroundColor: "#FFB013",
            borderRadius: 54,
            paddingVertical: 8,
            paddingHorizontal: 12,
            marginTop: 8,
            marginLeft: 8,
          }}>
            <Text style={{
              color: "black",
              fontSize: 14,
              fontFamily: "Nunito_600SemiBold",
            }}>
              Популярный курс
            </Text>
          </View>
          <View style={{ position: "absolute", zIndex: 14, right: 0 }}>
            <View style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#141517",
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 3,
              marginTop: 8,
              marginRight: 8,
            }}>
              <FontAwesome name="star" size={14} color={"#FFB800"} />
              <Text style={{
                color: "white",
                marginLeft: 4,
                fontFamily: "Nunito_600SemiBold",
              }}>
                {courseData?.ratings || 0}
              </Text>
            </View>
          </View>
          <Image
            source={courseData?.thumbnail.url}
            style={{ width: "100%", height: 230, borderRadius: 6 }}
          />
        </View>

        <Text style={{
          marginHorizontal: 16,
          marginTop: 15,
          fontSize: 20,
          fontWeight: "600",
          fontFamily: "Raleway_700Bold",
        }}>
          {courseData?.name}
        </Text>

        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: 10,
          paddingTop: 5,
        }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{
              color: "#000",
              fontSize: 22,
              marginLeft: 10,
              paddingVertical: 10,
            }}>
              {courseData?.price} ₽
            </Text>
            <Text style={{
              color: "#808080",
              fontSize: 20,
              marginLeft: 10,
              textDecorationLine: "line-through",
            }}>
              {courseData?.estimatedPrice} ₽
            </Text>
          </View>
          <Text style={{ fontSize: 15 }}>
            {courseData?.purchased} студентов
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Course Prerequisites
          </Text>
          {courseData?.prerequisites.map(
            (item: PrerequisiteType, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  width: "95%",
                  paddingVertical: 5,
                }}
              >
                <Ionicons name="checkmark-done-outline" size={18} />
                <Text style={{ paddingLeft: 5, fontSize: 16 }}>
                  {item.title}
                </Text>
              </View>
            )
          )}
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            Course Benefits
          </Text>
          {courseData?.benefits.map((item: BenefitType, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                width: "95%",
                paddingVertical: 5,
              }}
            >
              <Ionicons name="checkmark-done-outline" size={18} />
              <Text style={{ paddingLeft: 5, fontSize: 16 }}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.tabContainer}>
          {[
            { id: "About", title: "О курсе" },
            { id: "Lessons", title: "Уроки" },
            { id: "Reviews", title: "Отзывы" }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabButton,
                activeButton === tab.id && styles.activeTabButton,
              ]}
              onPress={() => setActiveButton(tab.id)}
            >
              <Text style={[
                styles.tabButtonText,
                activeButton === tab.id && styles.activeTabButtonText,
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeButton === "About" && (
          <View
            style={{
              marginHorizontal: 16,
              marginVertical: 25,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
              About course
            </Text>
            <Text
              style={{
                color: "#525258",
                fontSize: 16,
                marginTop: 10,
                textAlign: "justify",
                fontFamily: "Nunito_500Medium",
              }}
            >
              {isExpanded
                ? courseData?.description
                : courseData?.description.slice(0, 302)}
            </Text>
            {courseData?.description.length > 302 && (
              <TouchableOpacity
                style={{ marginTop: 3 }}
                onPress={() => setIsExpanded(!isExpanded)}
              >
                <Text
                  style={{
                    color: "#2467EC",
                    fontSize: 14,
                  }}
                >
                  {isExpanded ? "Показать меньше" : "Показать больше"}
                  {isExpanded ? "-" : "+"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {activeButton === "Lessons" && (
          <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
            <CourseLesson courseDetails={courseData} />
          </View>
        )}

        {activeButton === "Reviews" && (
          <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
            <View style={{ rowGap: 25 }}>
              {courseData?.reviews && courseData.reviews.length > 0 ? (
                courseData.reviews.map((item: ReviewType, index: number) => (
                  <ReviewCard item={item} key={index} />
                ))
              ) : (
                <Text style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontFamily: "Nunito_600SemiBold",
                  color: "#4F4F4F"
                }}>
                  Отзывов пока нет
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{
        backgroundColor: "#FFFF",
        marginHorizontal: 16,
        paddingVertical: 11,
        marginBottom: 10,
      }}>
        {isPurchased ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingVertical: 16,
              borderRadius: 4,
            }}
            onPress={() => router.push({
              pathname: "/(routes)/course-access",
              params: { courseData: JSON.stringify(courseData) },
            })}
          >
            <Text style={{
              textAlign: "center",
              color: "#FFFF",
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            }}>
              Перейти к курсу
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#2467EC",
              paddingVertical: 16,
              borderRadius: 4,
            }}
            onPress={handleAddToCart}
          >
            <Text style={{
              textAlign: "center",
              color: "#FFFF",
              fontSize: 16,
              fontFamily: "Nunito_600SemiBold",
            }}>
              Добавить в корзину
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 16,
    backgroundColor: "#E1E9F8",
    borderRadius: 50,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 50,
  },
  activeTabButton: {
    backgroundColor: "#2467EC",
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: "#000",
  },
  activeTabButtonText: {
    color: "#fff",
  },
});
