import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES, FONTS, CommonStyles } from "@/components/style";
import { useRouter } from "expo-router";
import { forgotPassword } from "@/api/auth";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
});

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await forgotPassword(formData.email);
      router.replace(`/forgot-password/password-token?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      if (error.response.data) {
        return alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
            Reset Password
          </Text>
        </View>

        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={{ width: "85%" }}>
              <View style={{ marginBottom: SIZES.base }}>
                <TextInput
                  style={CommonStyles.textInput}
                  placeholder="Email"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && touched.email && (
                  <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                style={[
                  CommonStyles.button,
                  {
                    backgroundColor: loading ? COLORS.gray : COLORS.primary,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: SIZES.padding,
                  },
                ]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white}
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  Kirim
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <View style={[CommonStyles.row, { marginTop: SIZES.padding }]}>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            Kembali ke{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={{ color: COLORS.primary, ...FONTS.body4 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
