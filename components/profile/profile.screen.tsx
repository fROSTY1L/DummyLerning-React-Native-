import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { CoursesType } from "@/types/courses";
import { coursesData } from "@/constants/constants";

export default function ProfileScreen() {
  const [active, setActive] = useState(0);
  const [myCourses, setMyCourses] = useState<CoursesType[]>([]);
  
  useEffect(() => {
    // Обновляем список купленных курсов при монтировании и при изменении global.purchasedCourses
    setMyCourses(global.purchasedCourses || []);
  }, [global.purchasedCourses]);

  // Демо-данные пользователя
  const user = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    avatar: require("@/assets/icons/User.png"),
    role: "user",
    courses: coursesData.slice(0, 2), // Имитация купленных курсов (первые два)
  };

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const logoutHandler = () => {
    router.push("/welcome-intro");
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={user.avatar}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
            <View style={{ paddingLeft: 20 }}>
              <Text style={{ fontSize: 24, fontFamily: "Raleway_700Bold" }}>
                {user.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Nunito_600SemiBold",
                  color: "#595959",
                }}
              >
                {user.email}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              width: "45%",
              backgroundColor: active === 0 ? "#000" : "#fff",
              height: 40,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setActive(0)}
          >
            <Text
              style={{
                color: active === 0 ? "#fff" : "#000",
                fontSize: 18,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Мои курсы
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "45%",
              backgroundColor: active === 1 ? "#000" : "#fff",
              height: 40,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setActive(1)}
          >
            <Text
              style={{
                color: active === 1 ? "#fff" : "#000",
                fontSize: 18,
                fontFamily: "Nunito_600SemiBold",
              }}
            >
              Купленные
            </Text>
          </TouchableOpacity>
        </View>

        {active === 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            {myCourses.length > 0 ? (
              myCourses.map((item: CoursesType) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    router.push({
                      pathname: "/course-access",
                      params: { courseData: JSON.stringify(item) },
                    })
                  }
                >
                  <View
                    style={{
                      marginVertical: 10,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={item.thumbnail.url}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                        }}
                      />
                      <View style={{ paddingLeft: 10, width: "75%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Raleway_700Bold",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Nunito_600SemiBold",
                            color: "#595959",
                            paddingVertical: 5,
                          }}
                        >
                          {item.description.slice(0, 40)}...
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold"
              }}>
                У вас пока нет купленных курсов
              </Text>
            )}
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {myCourses.length > 0 ? (
              myCourses.map((item: CoursesType) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    router.push({
                      pathname: "/course-access",
                      params: { courseData: JSON.stringify(item) },
                    })
                  }
                >
                  <View
                    style={{
                      marginVertical: 10,
                      backgroundColor: "#fff",
                      borderRadius: 10,
                      padding: 10,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={item.thumbnail.url}
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: 10,
                        }}
                      />
                      <View style={{ paddingLeft: 10, width: "75%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontFamily: "Raleway_700Bold",
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: "Nunito_600SemiBold",
                            color: "#595959",
                            paddingVertical: 5,
                          }}
                        >
                          {item.description.slice(0, 40)}...
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{
                textAlign: "center",
                marginTop: 20,
                fontSize: 16,
                fontFamily: "Nunito_600SemiBold"
              }}>
                У вас пока нет купленных курсов
              </Text>
            )}
          </ScrollView>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "#FF4747",
            width: "100%",
            height: 50,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 10,
          }}
          onPress={logoutHandler}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "Nunito_600SemiBold",
            }}
          >
            Выйти
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
