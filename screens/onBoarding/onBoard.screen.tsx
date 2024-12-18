import { styles } from '@/styles/onboarding/onboard.style';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useFonts, Raleway_700Bold, Raleway_500Medium } from '@expo-google-fonts/raleway';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const OnBoardingScreen = () => {
  let [isFontLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_500Medium,
    Nunito_400Regular,
    Nunito_700Bold
  })
  if (!isFontLoaded && !fontError){
    return null
  }
  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <View style={styles.firstContainer}>
        <View>
          <Image source={require("@/assets/logo.png")} style={styles.logo}/>
          <Image source={require("@/assets/onboarding/shape_9.png")}/>
        </View>
        <View style={styles.titleWrapper}>
          <Image source={require("@/assets/onboarding/shape_3.png")} style={styles.titleTextShape1}/>
          <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
            Даже ты поймешь
          </Text>
          <Image source={require("@/assets/onboarding/shape_2.png")} style={styles.titleTextShape2}/>
        </View>
        <View >
          <Image style={styles.titleTextShape3} source={require("@/assets/onboarding/shape_6.png")}/>
          <Text style={[styles.brandName, {fontFamily: "Raleway_700Bold"}]}>Dummy Lerning</Text>
        </View>
        <View style={styles.describeWrapper}>
          <Text style={[styles.describeText, {fontFamily: "Nunito_400Regular"}]} >
            Знания - полезная штука, настоятельно рекомендуем. Может вам даже понравится...
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonWrapper} onPress={() => router.push("/(routes)/welcome-intro")}>
          <Text style={[styles.buttonText, {fontFamily: "Nunito_700Bold"}]}>
            Приступить к изучению!
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default OnBoardingScreen;