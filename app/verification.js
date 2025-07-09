import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, CommonStyles } from "@/components/style";
import { useRouter } from "expo-router";

const VerificationScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={CommonStyles.container}>
      <View style={CommonStyles.flexCenter}>
        <View style={{ marginBottom: SIZES.padding * 2 }}>
          <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
            PPDB Online
          </Text>
          <Text
            style={{ ...FONTS.body3, color: COLORS.gray, textAlign: "center" }}
          >
            Email telah diverifikasi.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            CommonStyles.button,
            {
              backgroundColor: COLORS.primary,
              marginBottom: SIZES.padding,
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
              elevation: 3,
              shadowColor: COLORS.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              height: 50,
            },
          ]}
          onPress={() => router.push("/login")}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body3,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Kembali ke Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
