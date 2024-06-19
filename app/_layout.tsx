import { Slot } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from "expo-font";
import { Platform } from "react-native";

export default function RootLayout() {

  const [fontsLoaded, fontError] = useFonts({
    'UbB': require('../assets/fonts/Ubuntu-Bold.ttf'),
    'UbM': require('../assets/fonts/Ubuntu-Medium.ttf'),
    'UbR': require('../assets/fonts/Ubuntu-Regular.ttf'),
  });

  useEffect(() => {
    const launchSetting = async () => {
      if (Platform.OS !== 'android') return;
      await NavigationBar.setPositionAsync('absolute');
      await NavigationBar.setBackgroundColorAsync('#FFFFFF00');
    }
    launchSetting();
  }, []);

  if (!fontsLoaded || fontError) return null;

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <Slot />
    </SafeAreaView>
  )
}