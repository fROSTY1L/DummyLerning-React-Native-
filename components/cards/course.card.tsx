import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CoursesType } from '@/types/courses';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CourseCard({ item }: { item: CoursesType }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: "/(routes)/course-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View style={{ paddingHorizontal: 10 }}>
        <Image
          style={{
            width: wp(86),
            height: 220,
            borderRadius: 5,
            alignSelf: "center",
            objectFit: "cover",
          }}
          source={item.thumbnail.url}
        />
        <View style={{ width: wp(85) }}>
          <Text
            style={{
              fontSize: 14,
              textAlign: "left",
              marginTop: 10,
              fontFamily: "Raleway_600SemiBold",
            }}
          >
            {item.name}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#141517",
              padding: 4,
              borderRadius: 5,
              gap: 4,
              paddingHorizontal: 10,
              height: 28,
              marginTop: 10,
            }}
          >
            <FontAwesome name="star" size={14} color={"#ffb800"} />
            <Text style={[styles.ratingText]}>{item?.ratings || 0}</Text>
          </View>
          <Text>{item.purchased || 0} Студентов</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 5,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ paddingTop: 10, fontSize: 18, fontWeight: "600" }}>
              {item?.price} ₽
            </Text>
            {item?.estimatedPrice && (
              <Text
                style={{
                  paddingLeft: 5,
                  textDecorationLine: "line-through",
                  fontSize: 16,
                  fontWeight: "400",
                }}
              >
                {item.estimatedPrice} ₽
              </Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="list-outline" size={20} color={"#8A8A8A"} />
            <Text style={{ marginLeft: 5 }}>
              {item.courseData.length} Лекций
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF",
    marginHorizontal: 6,
    borderRadius: 12,
    width: "95%",
    height: "auto",
    overflow: "hidden",
    margin: "auto",
    marginVertical: 15,
    padding: 8,
  },
  ratingText: {
    color: "white",
    fontSize: 14,
  },
});
