import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { CoursesType } from "@/types/courses";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CoursesType[]>([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    // Получаем данные корзины при монтировании и при каждом обновлении global.cart
    setCartItems(global.cart || []);
  }, [global.cart]);

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };

  const handleCourseDetails = (courseDetails: CoursesType) => {
    router.push({
      pathname: "/(routes)/course-details",
      params: { item: JSON.stringify(courseDetails) },
    });
  };

  const handleRemoveItem = (item: CoursesType) => {
    const updatedCartData = cartItems.filter((i) => i._id !== item._id);
    setCartItems(updatedCartData);
    global.cart = updatedCartData;
    
    // Обновляем счетчик в хедере
    if (global.updateCartCount) {
      global.updateCartCount(updatedCartData.length);
    }
  };

  const handlePayment = () => {
    // Добавляем купленные курсы в глобальное хранилище
    if (!global.purchasedCourses) {
      global.purchasedCourses = [];
    }
    
    // Добавляем все курсы из корзины в купленные
    global.purchasedCourses = [...global.purchasedCourses, ...cartItems];
    
    // Очищаем корзину
    global.cart = [];
    if (global.updateCartCount) {
      global.updateCartCount(0);
    }
    
    setOrderSuccess(true);
  };

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      {orderSuccess ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Ionicons 
            name="checkmark-circle-outline" 
            size={100} 
            color="#2467EC"
            style={{ marginBottom: 20 }}
          />
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <Text style={{ fontSize: 22, fontFamily: "Raleway_700Bold" }}>
              Оплата успешна!
            </Text>
            <Text style={{
              fontSize: 15,
              marginTop: 5,
              color: "#575757",
              fontFamily: "Nunito_400Regular",
            }}>
              Спасибо за покупку!
            </Text>
          </View>
        </View>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Ionicons 
                name="cart-outline" 
                size={100} 
                color="#2467EC"
                style={{ marginBottom: 20 }}
              />
              <Text style={{
                fontSize: 18,
                fontFamily: "Nunito_600SemiBold",
                color: "#4F4F4F",
                textAlign: "center",
              }}>
                Корзина пуста
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={{
                    flexDirection: "row",
                    marginVertical: 8,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "white",
                  }}>
                    <TouchableOpacity onPress={() => handleCourseDetails(item)}>
                      <Image
                        source={item.thumbnail.url}
                        style={{
                          width: 100,
                          height: 100,
                          marginRight: 16,
                          borderRadius: 8,
                        }}
                      />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                      <TouchableOpacity onPress={() => handleCourseDetails(item)}>
                        <Text style={{
                          fontSize: 16,
                          fontWeight: "600",
                          fontFamily: "Nunito_700Bold",
                        }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                        <View style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginRight: 16,
                        }}>
                          <Entypo name="dot-single" size={24} color="gray" />
                          <Text style={{
                            fontSize: 16,
                            color: "#808080",
                            fontFamily: "Nunito_400Regular",
                          }}>
                            {item.level}
                          </Text>
                        </View>
                        <Text style={{
                          fontSize: 16,
                          color: "#808080",
                          fontFamily: "Nunito_400Regular",
                        }}>
                          {item.price} ₽
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#FF6347",
                          borderRadius: 5,
                          padding: 5,
                          marginTop: 10,
                          width: 100,
                        }}
                        onPress={() => handleRemoveItem(item)}
                      >
                        <Text style={{
                          color: "white",
                          fontSize: 16,
                          textAlign: "center",
                          fontFamily: "Nunito_600SemiBold",
                        }}>
                          Удалить
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <View style={{ padding: 20 }}>
                <Text style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontFamily: "Nunito_700Bold",
                }}>
                  Итого: {calculateTotalPrice()} ₽
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#2467EC",
                    borderRadius: 5,
                    padding: 10,
                    marginTop: 20,
                  }}
                  onPress={handlePayment}
                >
                  <Text style={{
                    color: "white",
                    fontSize: 18,
                    textAlign: "center",
                    fontFamily: "Nunito_600SemiBold",
                  }}>
                    Оплатить
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
    </LinearGradient>
  );
}
