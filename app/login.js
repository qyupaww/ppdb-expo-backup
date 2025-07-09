import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES, FONTS, CommonStyles } from "@/components/style";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authLogin } = useAuth();

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      await authLogin(formData.email, formData.password);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 401) {
        return alert("Email atau password salah.");
      }

      alert("Login gagal. Cek kembali email dan password anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={CommonStyles.flexCenter}>
            <View style={{ marginBottom: SIZES.padding * 2 }}>
              <Text style={{ ...FONTS.h1, color: COLORS.primary }}>
                PPDB Online
              </Text>
              <Text
                style={{
                  ...FONTS.body3,
                  color: COLORS.gray,
                  textAlign: "center",
                }}
              >
                Login untuk melanjutkan
              </Text>
            </View>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View style={{ width: "85%" }}>
                  {/* Email Input */}
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
                    {touched.email && errors.email && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <View style={{ marginBottom: SIZES.padding }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TextInput
                        style={[CommonStyles.textInput, { flex: 1 }]}
                        placeholder="Password"
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
                    {touched.password && errors.password && (
                      <Text style={{ color: "red", fontSize: 12 }}>
                        {errors.password}
                      </Text>
                    )}
                  </View>

                  {/* Login Button */}
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
                      Login
                    </Text>
                  </TouchableOpacity>


                  {/* Forgot Password */}
                  <TouchableOpacity
                    onPress={() => router.push("/forgot-password")}
                  >
                    <Text
                      style={{
                        color: COLORS.primary,
                        textAlign: "center",
                        ...FONTS.body4,
                      }}
                    >
                      Lupa Password?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Register Link */}
            <View style={[CommonStyles.row, { marginTop: SIZES.padding * 2 }]}>
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                Belum punya akun?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={{ color: COLORS.primary, ...FONTS.body4 }}>
                  Register disini
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
