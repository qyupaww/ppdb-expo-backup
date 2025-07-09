import React from "react";
import { View, Image, SafeAreaView, Text } from "react-native";
import { CommonStyles, FONTS, COLORS } from "@/components/style";
import Logo from "@/assets/twh.png";

export default function SplashScreen() {
  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={CommonStyles.flexCenter}>
        <Image
          source={Logo}
          style={{ width: 150, height: 150, marginBottom: 20 }}
        />
        <Text style={{ ...FONTS.h1, color: COLORS.primary }}>PPDB Online</Text>
      </View>
    </SafeAreaView>
  );
}
