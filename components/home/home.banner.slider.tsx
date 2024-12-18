import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import Swiper from 'react-native-swiper';
import { bannerData } from "@/constants/constants";
import { BannerDataTypes } from '@/types/global';

const { width } = Dimensions.get('window');

export default function HomeBannerSlider() {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
      >
        {bannerData.map((item: BannerDataTypes, index: number) => (
          <View key={index} style={styles.slide}>
            <Image
              source={item.bannerImageUrl}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 20,
    marginTop: 20,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: '100%',
    aspectRatio: 16 / 9,
  },
  dot: {
    backgroundColor: '#E1E2E5',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    bottom: -10,
  },
  activeDot: {
    backgroundColor: '#2467EC',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    bottom: -10,
  },
});
