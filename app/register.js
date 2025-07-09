import React, { useState } from "react";
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
import { register } from "@/api/auth";
import CommonDropdown from "../components/CommonDropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import WebDateInput from "@/components/WebDateInput";

const IntendedLevelOptions = [
  { label: "SD / Sederajat", value: 1 },
  { label: "SMP / Sederajat", value: 2 },
  { label: "SMA / Sederajat", value: 3 },
];

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama terlalu pendek!")
    .required("Nama wajib diisi"),
  gender: Yup.string()
    .required("Jenis kelamin wajib diisi"),
  birth_place: Yup.string()
    .min(2, "Nama terlalu pendek!")
    .required("Nama wajib diisi"),
  birth_date: Yup.date()
    .required("Tanggal lahir wajib diisi"),
  family_card_number: Yup.string()
    .matches(/^\d{16}$/, "Nomor Kartu Keluarga harus 16 digit")
    .required("Nomor Kartu Keluarga wajib diisi"),
  national_id_number: Yup.string()
    .matches(/^\d{16}$/, "Nomor NIK harus 16 digit")
    .required("Nomor NIK wajib diisi"),
  intended_level: Yup.number()
    .required("Tingkat pendidikan wajib diisi"),
  nisn: Yup.string().when("intended_level", (intendedLevel, schema) => {
    if (intendedLevel > 1) {
      return schema
        .matches(/^\d{10}$/, "NISN harus 10 digit")
        .required("NISN wajib diisi");
    }
    return schema.notRequired();
  }),
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

const RegisterScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return ""; // Invalid Date
      return d.toISOString().split("T")[0]; // format YYYY-MM-DD
    } catch {
      return "";
    }
  };

  const handleRegister = async (formData, { setErrors }) => {
    setLoading(true);
    try {
      await register(formData);
      alert("Register berhasil. Silahkan cek email anda untuk verifikasi.");
      router.push("/login");
    } catch (error) {
      console.log("Register error:", error.response.data);

      if (error.response.status === 400) {
        if (error.response.data) {
          const errors = error.response.data.errors || {};
          const apiErrors = {};

          if (errors.email) apiErrors.email = errors.email.join(", ");
          if (errors.name) apiErrors.name = errors.name.join(", ");
          if (errors.national_id_number) apiErrors.national_id_number = errors.national_id_number.join(", ");
          setErrors(apiErrors);
        }
      } else {
        alert("Register gagal. Silahkan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[CommonStyles.container, { flex: 1 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={CommonStyles.keyboardAvoidingContainer}
      >
        <ScrollView
          contentContainerStyle={CommonStyles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={CommonStyles.flexCenter}>
            {/* Header */}
            <View style={{ margin: SIZES.padding * 2 }}>
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
                Daftar akun baru
              </Text>
            </View>

            <Formik
              initialValues={{
                name: '',
                birth_place: '',
                birth_date: '',
                gender: 'male',
                family_card_number: '',
                national_id_number: '',
                intended_level: 1,
                nisn: null,
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldValue,
              }) => (
                <View style={{
                  width: "100%",
                  flex: 1,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.background,
                }}>
                  {/* Full Name Input */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Nama Lengkap <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <TextInput
                      style={CommonStyles.textInput}
                      placeholder="Masukan Nama Lengkap"
                      placeholderTextColor={COLORS.gray}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                    />
                    {errors.name && touched.name && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  {/* Gender Input */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Jenis Kelamin <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <View style={CommonStyles.inputRadio}>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center", marginRight: 20 }}
                        onPress={() => handleChange("gender")("male")}
                      >
                        <Ionicons
                          name={values.gender === "male" ? "radio-button-on" : "radio-button-off"}
                          size={20}
                          color={COLORS.primary}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body4 }}>Laki-laki</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ flexDirection: "row", alignItems: "center" }}
                        onPress={() => handleChange("gender")("female")}
                      >
                        <Ionicons
                          name={values.gender === "female" ? "radio-button-on" : "radio-button-off"}
                          size={20}
                          color={COLORS.primary}
                        />
                        <Text style={{ marginLeft: 5, ...FONTS.body4 }}>Perempuan</Text>
                      </TouchableOpacity>
                    </View>
                    {errors.gender && touched.gender && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>{errors.gender}</Text>
                    )}
                  </View>

                  {/* birth_place */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Tempat Lahir <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <TextInput
                      style={CommonStyles.textInput}
                      placeholder="Masukan Tempat Lahir"
                      placeholderTextColor={COLORS.gray}
                      onChangeText={handleChange("birth_place")}
                      onBlur={handleBlur("birth_place")}
                      value={values.birth_place}
                    />
                    {errors.birth_place && touched.birth_place && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>{errors.birth_place}</Text>
                    )}
                  </View>

                  {/* Tanggal Lahir */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={{
                      fontFamily: "Lexend-Deca-Regular",
                      fontSize: SIZES.body4,
                      marginBottom: 4,
                      color: COLORS.black,
                    }}>
                      Tanggal Lahir
                    </Text>

                    {Platform.OS === "web" ? (
                      <WebDateInput
                        value={formatDate(values.birth_date)}
                        onChange={(date) => setFieldValue("birth_date", date)}
                        customStyle={{
                          fontFamily: "Lexend-Deca-Regular",
                          height: 20,
                          marginTop: 8,
                          marginBottom: 8,
                          padding: 15,
                          fontSize: 14,
                          borderRadius: SIZES.radius,
                          border: '1px solid #DFDFDF',
                        }}
                      />
                    ) : (
                      <>
                        <TouchableOpacity
                          style={CommonStyles.textInput}
                          onPress={() => setShowDatePicker(true)}
                        >
                          <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                              style={{
                                fontSize: SIZES.body4,
                                color: values.birth_date ? COLORS.black : COLORS.gray,
                                fontFamily: "Lexend-Deca-Regular",
                                flex: 1,
                              }}
                            >
                              {values.birth_date ? formatDate(values.birth_date) : "Pilih tanggal"}
                            </Text>

                            <Ionicons
                              name="calendar-outline"
                              size={20}
                              color={COLORS.gray}
                              style={{ marginLeft: 8 }}
                            />
                          </View>
                        </TouchableOpacity>


                        {showDatePicker && (
                          <DateTimePicker
                            value={values.birth_date || new Date()}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={(event, selectedDate) => {
                              setShowDatePicker(false);
                              if (selectedDate) {
                                setFieldValue("birth_date", selectedDate);
                              }
                            }}
                          />
                        )}
                      </>
                    )}

                    {errors.birth_date && touched.birth_date && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                        {errors.birth_date}
                      </Text>
                    )}
                  </View>

                  {/* family_card_number */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Nomor Kartu Keluarga <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <TextInput
                      style={CommonStyles.textInput}
                      placeholder="Masukan Nomor Kartu Keluarga"
                      placeholderTextColor={COLORS.gray}
                      onChangeText={handleChange("family_card_number")}
                      onBlur={handleBlur("family_card_number")}
                      value={values.family_card_number}
                      keyboardType="numeric"
                      maxLength={16}
                    />
                    {errors.family_card_number && touched.family_card_number && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>{errors.family_card_number}</Text>
                    )}
                  </View>

                  {/* national_id_number */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Nomor Induk Kependudukan <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <TextInput
                      style={CommonStyles.textInput}
                      placeholder="Masukan Nomor NIK"
                      placeholderTextColor={COLORS.gray}
                      onChangeText={handleChange("national_id_number")}
                      onBlur={handleBlur("national_id_number")}
                      value={values.national_id_number}
                      keyboardType="numeric"
                      maxLength={16}
                    />
                    {errors.national_id_number && touched.national_id_number && (
                      <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>{errors.national_id_number}</Text>
                    )}
                  </View>

                  {/* intended_level */}
                  <Text style={CommonStyles.labelInput}>
                    Jenjang yang dituju <Text style={{ color: COLORS.danger }}>*</Text>
                  </Text>
                  <CommonDropdown
                    label="Pilih Tingkat Pendidikan"
                    options={IntendedLevelOptions}
                    value={values.intended_level}
                    onSelect={(val) => {
                      setFieldValue("intended_level", val);
                      if (val <= 1) setFieldValue("nisn", null);
                    }}
                  />
                  {errors.intended_level && touched.intended_level && (
                    <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>
                      {errors.intended_level}
                    </Text>
                  )}

                  {/* nisn */}
                  {values.intended_level > 1 && (
                    <View style={{ marginBottom: SIZES.base }}>
                      <Text style={CommonStyles.labelInput}>
                        Nomor Induk Siswa Nasional {values.intended_level > 1 && (<Text style={{ color: COLORS.danger }}>*</Text>)}
                      </Text>
                      <TextInput
                        style={CommonStyles.textInput}
                        placeholder="Masukan NISN"
                        placeholderTextColor={COLORS.gray}
                        onChangeText={handleChange("nisn")}
                        onBlur={handleBlur("nisn")}
                        value={values.nisn}
                        keyboardType="numeric"
                        maxLength={10}
                      />
                      {errors.nisn && touched.nisn && (
                        <Text style={{ color: COLORS.danger, ...FONTS.body5 }}>{errors.nisn}</Text>
                      )}
                    </View>
                  )}

                  {/* Email Input */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Email <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <TextInput
                      style={CommonStyles.textInput}
                      placeholder="Masukan Email"
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

                  {/* Password Input */}
                  <View style={{ marginBottom: SIZES.base }}>
                    <Text style={CommonStyles.labelInput}>
                      Password <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <TextInput
                        style={[CommonStyles.textInput, { flex: 1 }]}
                        placeholder="Masukan Password"
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

                  {/* Confirm Password Input */}
                  <View style={{ marginBottom: SIZES.padding }}>
                    <Text style={CommonStyles.labelInput}>
                      Konfirmasi Password <Text style={{ color: COLORS.danger }}>*</Text>
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
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

                  {/* Register Button */}
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
                      Daftar
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Login Link */}
            <View style={[CommonStyles.row, { margin: SIZES.padding }]}>
              <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                Sudah punya akun?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={{ color: COLORS.primary, ...FONTS.body4 }}>
                  Login disini
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
