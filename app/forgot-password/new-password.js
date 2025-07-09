import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES, FONTS, CommonStyles } from "@/components/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { resetPassword } from "@/api/auth";

const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password minimal 8 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

const showAlert = (title, message, onPress) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
    if (onPress) onPress();
  } else {
    Alert.alert(title, message, [{ text: "OK", onPress }], {
      cancelable: false,
    });
  }
};

const NewPasswordScreen = () => {
  const { email, code } = useLocalSearchParams();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = {
        email,
        code,
        newPassword: formData.password
      }
      await resetPassword(data);
      showAlert("Berhasil", "Password baru berhasil disimpan", () =>
        router.push("/login")
      );
    } catch (error) {
      console.log(error.response.data);

      if (error.response.status === 401) {
        return alert(error.response.data.message);
      }

      alert("Kode verifikasi salah.");
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
            Buat Password Baru
          </Text>
        </View>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={NewPasswordSchema}
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
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[CommonStyles.textInput, { flex: 1 }]}
                    placeholder="Password Baru"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10 }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color={COLORS.gray}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                    {errors.password}
                  </Text>
                )}
              </View>

              <View style={{ marginBottom: SIZES.padding }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={[CommonStyles.textInput, { flex: 1 }]}
                    placeholder="Konfirmasi Password"
                    placeholderTextColor={COLORS.gray}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 10 }}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Ionicons
                      name={showConfirmPassword ? "eye-off" : "eye"}
                      size={24}
                      color={COLORS.gray}
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                    {errors.confirmPassword}
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
                  Simpan Password Baru
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

export default NewPasswordScreen;
