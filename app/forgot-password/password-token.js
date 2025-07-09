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
import { useLocalSearchParams, useRouter } from "expo-router";
import { verifyCode } from "@/api/auth";

const TokenVerificationSchema = Yup.object().shape({
  token: Yup.string()
    .required("Kode verifikasi wajib diisi")
    .min(6, "Kode verifikasi harus 6 karakter")
    .max(6, "Kode verifikasi harus 6 karakter"),
});

const PasswordTokenScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = {
        email: email,
        code: formData.token,
      }
      await verifyCode(data);
      router.replace("/forgot-password/new-password?email="
        + encodeURIComponent(data.email)
        + "&code="
        + encodeURIComponent(data.code));
    } catch (error) {
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
            Verifikasi Token
          </Text>
        </View>

        <Formik
          initialValues={{
            token: "",
          }}
          validationSchema={TokenVerificationSchema}
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
                  placeholder="Masukkan kode verifikasi"
                  placeholderTextColor={COLORS.gray}
                  onChangeText={handleChange("token")}
                  onBlur={handleBlur("token")}
                  value={values.token}
                  keyboardType="number-pad"
                  maxLength={6}
                />
                {errors.token && touched.token && (
                  <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                    {errors.token}
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
                  Verifikasi Token
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

export default PasswordTokenScreen;
