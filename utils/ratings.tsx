import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const Ratings = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <FontAwesome
          key={i}
          name="star"
          size={20}
          style={{ marginHorizontal: 2 }}
          color={"#FFB800"}
        />
      );
    } else {
      stars.push(
        <FontAwesome
          key={i}
          name="star-o"
          size={20}
          style={{ marginHorizontal: 2 }}
          color={"#FFB800"}
        />
      );
    }
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default Ratings; 