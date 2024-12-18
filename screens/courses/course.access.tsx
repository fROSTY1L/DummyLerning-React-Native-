import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { CoursesType, CourseDataType } from "@/types/courses";
import { router } from "expo-router";

export default function CourseAccessScreen() {
  const { courseData } = useLocalSearchParams();
  const data: CoursesType = JSON.parse(courseData as string);
  
  const [activeButton, setActiveButton] = useState("About");
  const [isExpanded, setIsExpanded] = useState(false);

  // Демо-данные для вопросов
  const demoQuestions = [
    {
      user: {
        name: "Алексей Смирнов",
        avatar: require("@/assets/icons/User.png")
      },
      question: "Подходит ли курс для полных новичков в программировании?",
      answer: "Да, курс начинается с самых основ. Мы подробно разбираем каждую тему и даем много практики.",
      date: "2024-01-15"
    },
    {
      user: {
        name: "Елена Волкова",
        avatar: require("@/assets/icons/User.png")
      },
      question: "Сколько времени нужно уделять обучению ежедневно?",
      answer: "Рекомендуется заниматься 1-2 часа в день для лучшего усвоения материала.",
      date: "2024-01-10"
    }
  ];

  // Демо-данные для отзывов
  const demoReviews = [
    {
      user: {
        name: "Дмитрий Петров",
        avatar: require("@/assets/icons/User.png")
      },
      rating: 5,
      review: "Отличный курс! Материал подается структурированно и понятно. Особенно понравились практические задания.",
      date: "2024-01-20"
    },
    {
      user: {
        name: "Ольга Иванова",
        avatar: require("@/assets/icons/User.png")
      },
      rating: 4,
      review: "Хороший курс, много полезной информации. Единственное - хотелось бы больше реальных примеров.",
      date: "2024-01-18"
    }
  ];

  const handleBack = () => {
    router.back();
  };

  const handleForward = () => {
    router.push("/(tabs)/courses");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>
            Назад
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleForward}
        >
          <Text style={styles.buttonText}>
            К курсам
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <Text style={styles.courseTitle}>
          {data.name}
        </Text>
      </View>

      {/* Навигационные кнопки */}
      <View style={styles.tabContainer}>
        {[
          { id: "About", title: "О курсе" },
          { id: "Q&A", title: "Вопросы" },
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

      {/* Контент вкладок */}
      {activeButton === "About" && (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>О курсе</Text>
          <Text style={styles.contentText}>
            {isExpanded ? data?.description : data?.description.slice(0, 302)}
          </Text>
          {data?.description.length > 302 && (
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.showMoreText}>
                {isExpanded ? "Показать меньше" : "Показать больше"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {activeButton === "Q&A" && (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Вопросы</Text>
          {demoQuestions.map((item, index) => (
            <View key={index} style={styles.questionContainer}>
              <View style={styles.userInfo}>
                <Image source={item.user.avatar} style={styles.userAvatar} />
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.questionText}>{item.question}</Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          ))}
        </View>
      )}

      {activeButton === "Reviews" && (
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Отзывы</Text>
          {demoReviews.map((item, index) => (
            <View key={index} style={styles.reviewContainer}>
              <View style={styles.userInfo}>
                <Image source={item.user.avatar} style={styles.userAvatar} />
                <View>
                  <Text style={styles.userName}>{item.user.name}</Text>
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name={i < item.rating ? "star" : "star-o"}
                        size={16}
                        color="#FFB800"
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
              </View>
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToDP("35%"),
    height: 40,
    backgroundColor: "#2467EC",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
  courseTitle: {
    fontSize: 20,
    fontFamily: "Raleway_700Bold",
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginHorizontal: 10,
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
  contentContainer: {
    marginHorizontal: 16,
    marginVertical: 25,
    paddingHorizontal: 10,
  },
  contentTitle: {
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
  },
  contentText: {
    color: "#525258",
    fontSize: 16,
    marginTop: 10,
    textAlign: "justify",
    fontFamily: "Nunito_500Medium",
  },
  showMoreText: {
    color: "#2467EC",
    fontSize: 14,
    marginTop: 3,
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontFamily: 'Raleway_600SemiBold',
    fontSize: 16,
    flex: 1,
  },
  date: {
    color: '#8A8A8A',
    fontSize: 12,
    fontFamily: 'Nunito_400Regular',
  },
  questionText: {
    fontSize: 16,
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#4F4F4F',
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    color: '#4F4F4F',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
