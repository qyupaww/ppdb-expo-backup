import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { AuthProvider } from "@/context/AuthProvider";
import { COLORS } from "@/components/style";
import { useFonts } from "expo-font";
import { TextInput, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const theme = {
  ...DefaultTheme,
  fonts: {
    ...DefaultTheme.fonts,
    bodyLarge: {
      ...DefaultTheme.fonts.bodyLarge,
      fontFamily: 'Lexend-Deca-Regular',
    },
  },
};

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Lexend-Deca-Black": require("@/assets/fonts/LexendDeca-Black.ttf"),
    "Lexend-Deca-Bold": require("@/assets/fonts/LexendDeca-Bold.ttf"),
    "Lexend-Deca-ExtraBold": require("@/assets/fonts/LexendDeca-ExtraBold.ttf"),
    "Lexend-Deca-ExtraLight": require("@/assets/fonts/LexendDeca-ExtraLight.ttf"),
    "Lexend-Deca-Light": require("@/assets/fonts/LexendDeca-Light.ttf"),
    "Lexend-Deca-Medium": require("@/assets/fonts/LexendDeca-Medium.ttf"),
    "Lexend-Deca-Regular": require("@/assets/fonts/LexendDeca-Regular.ttf"),
    "Lexend-Deca-SemiBold": require("@/assets/fonts/LexendDeca-SemiBold.ttf"),
    "Lexend-Deca-Thin": require("@/assets/fonts/LexendDeca-Thin.ttf"),
  });

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </PaperProvider>
  );
};

export default RootLayout;
