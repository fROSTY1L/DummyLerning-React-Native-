import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

// Держим сплэш экран видимым пока загружаются ресурсы
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    'Raleway_600SemiBold': require('@expo-google-fonts/raleway/Raleway_600SemiBold.ttf'),
    'Raleway_700Bold': require('@expo-google-fonts/raleway/Raleway_700Bold.ttf'),
    'Nunito_400Regular': require('@expo-google-fonts/nunito/Nunito_400Regular.ttf'),
    'Nunito_500Medium': require('@expo-google-fonts/nunito/Nunito_500Medium.ttf'),
    'Nunito_600SemiBold': require('@expo-google-fonts/nunito/Nunito_600SemiBold.ttf'),
    'Nunito_700Bold': require('@expo-google-fonts/nunito/Nunito_700Bold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: "#E5ECF9" }} />;
  }

  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome-intro" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(routes)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
}
