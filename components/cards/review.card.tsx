import { FontAwesome } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet } from "react-native";
import { ReviewType } from "@/types/courses";

const ReviewCard = ({ item }: { item: ReviewType }) => {
  const defaultAvatar = require("@/assets/icons/User.png");

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={defaultAvatar}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < (item.rating || 0) ? "star" : "star-o"}
                size={16}
                color="#FFB800"
                style={{ marginRight: 2 }}
              />
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Raleway_600SemiBold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  comment: {
    fontSize: 14,
    color: '#4F4F4F',
    fontFamily: 'Nunito_400Regular',
  },
});

export default ReviewCard;
