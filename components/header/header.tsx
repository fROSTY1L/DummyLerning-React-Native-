import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Header() {
  const userName = "Иван Иванов"; 
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const router = useRouter();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });
  
  if (!fontsLoaded && !fontError) {
    return null;
  }

  useEffect(() => {
    // Инициализируем корзину, если её нет
    if (!global.cart) {
      global.cart = [];
    }

    // Обновляем счетчик при монтировании
    setCartItemsCount(global.cart.length);

    // Добавляем функцию обновления счетчика в глобальную область
    global.updateCartCount = (count: number) => {
      setCartItemsCount(count);
    };
  }, []);

  const handleCartPress = () => {
    router.push("/(routes)/cart");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/icons/User.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text style={[styles.helloText, { fontFamily: "Raleway_700Bold" }]}>
            Привет,
          </Text>
          <Text style={[styles.text, { fontFamily: "Raleway_700Bold" }]}>
            {userName}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bellButton} onPress={handleCartPress}>
        <View>
          <Feather name="shopping-bag" size={26} color={"black"} />
          {cartItemsCount > 0 && (
            <View style={styles.bellContainer}>
              <Text style={{ color: "#fff", fontSize: 14 }}>
                {cartItemsCount}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 8,
    marginBottom: 8,
    width: "90%",
  },

  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 100,
  },

  text: {
    fontSize: 16,
  },

  bellButton: {
    borderWidth: 1,
    borderColor: "#E1E2E5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  bellIcon: {
    alignSelf: "center",
  },

  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: "#2467EC",
    position: "absolute",
    borderRadius: 50,
    right: -5,
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  helloText: { color: "#7C7C80", fontSize: 14 },
});
