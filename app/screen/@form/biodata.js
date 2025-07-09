import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, CommonStyles } from "@/components/style";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TextInput, ProgressBar, Text, Button } from "react-native-paper";
import { useForm } from "@/context/FormContext";
import PaperDropdown from "@/components/PaperDropdown";
import isEqual from "lodash.isequal";
import WebDateInput from "@/components/WebDateInput";
import { useAuth } from "../../../context/AuthProvider";

const BiodataSchema = Yup.object().shape({
  full_name: Yup.string().required("Nama lengkap wajib diisi"),
  nisn: Yup.string().required("NISN wajib diisi").matches(/^\d{10}$/, "NISN harus 10 digit"),
  nis: Yup.string().required("NIS wajib diisi"),
  gender: Yup.string().required("Jenis kelamin wajib diisi"),
  birth_place: Yup.string().required("Tempat lahir wajib diisi"),
  birth_date: Yup.date().required("Tanggal lahir wajib diisi"),
  religion: Yup.string(),
  phone_number: Yup.string(),
});

const genderOptions = [
  { label: "Laki-laki", value: "male" },
  { label: "Perempuan", value: "female" },
];

const religionOptions = [
  { label: "Islam", value: "Islam" },
  { label: "Kristen", value: "Kristen" },
  { label: "Katolik", value: "Katolik" },
  { label: "Hindu", value: "Hindu" },
  { label: "Buddha", value: "Buddha" },
  { label: "Konghucu", value: "Konghucu" },
  { label: "Lainnya", value: "Lainnya" },
];

const BiodataScreen = () => {
  const router = useRouter();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { formData, updateFormData, setIsFormDirty } = useForm();
  const { schoolId, resetKey } = useLocalSearchParams();
  const { user } = useAuth();

  const formatDate = (date) => {
    if (!date) return "";
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return "";
      return d.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <SafeAreaView style={[CommonStyles.container, { flex: 1 }]}>
      {/* Progress Bar */}
      <View style={CommonStyles.progressContainer}>
        <Text style={CommonStyles.stepText}>Step 1 of 4</Text>
        <ProgressBar
          progress={1 / 4}
          color={COLORS.primary}
          style={CommonStyles.progressBar}
        />
      </View>

      <ScrollView
        contentContainerStyle={CommonStyles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={CommonStyles.flexCenter}>
          <Formik
            key={resetKey}
            initialValues={{
              school_id: schoolId || "",
              full_name: formData.full_name || user?.student?.full_name || "",
              nisn: formData.nisn || user?.student?.nisn || "",
              nis: formData.nis || user?.student?.nis || "",
              gender: formData.gender || user?.student?.gender || "",
              birth_place: formData.birth_place || user?.student?.birth_place || "",
              birth_date: formData.birth_date || user?.student?.birth_date || null,
              religion: formData.religion || "",
              phone_number: formData.phone_number || "",
            }}
            enableReinitialize={true}
            validationSchema={BiodataSchema}
            onSubmit={(values) => {
              // Update form data in context
              updateFormData(values);
              // Navigate to the next screen
              router.push("/screen/@form/address");
            }}
          >
            {({
              initialValues,
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              resetForm,
            }) => {
              useEffect(() => {
                resetForm();
              }, [resetKey, schoolId]);

              useEffect(() => {
                const dirty = !isEqual(values, initialValues);
                setIsFormDirty(dirty);
              }, [values]);

              return (
                <View style={CommonStyles.paperContainer}>
                  {/* Judul */}
                  <Text style={CommonStyles.paperTitle}>
                    Biodata Siswa
                  </Text>

                  {/* Nama Lengkap */}
                  <TextInput
                    mode="outlined"
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("full_name")}
                    onBlur={handleBlur("full_name")}
                    value={values.full_name}
                    error={touched.full_name && errors.full_name}
                  />
                  {touched.full_name && errors.full_name && (
                    <Text style={CommonStyles.errorText}>{errors.full_name}</Text>
                  )}

                  {/* NISN */}
                  <TextInput
                    mode="outlined"
                    label="NISN"
                    placeholder="Masukkan NISN"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("nisn")}
                    onBlur={handleBlur("nisn")}
                    value={values.nisn}
                    keyboardType="number-pad"
                    error={touched.nisn && errors.nisn}
                  />
                  {touched.nisn && errors.nisn && (
                    <Text style={CommonStyles.errorText}>{errors.nisn}</Text>
                  )}

                  {/* NIS */}
                  <TextInput
                    mode="outlined"
                    label="NIS"
                    placeholder="Masukkan NIS"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("nis")}
                    onBlur={handleBlur("nis")}
                    value={values.nis}
                    keyboardType="number-pad"
                    error={touched.nis && errors.nis}
                  />
                  {touched.nis && errors.nis && (
                    <Text style={CommonStyles.errorText}>{errors.nis}</Text>
                  )}

                  {/* Jenis Kelamin */}
                  <PaperDropdown
                    label="Jenis Kelamin"
                    placeholder="Pilih jenis kelamin"
                    value={values.gender}
                    options={genderOptions}
                    onSelect={(val) => setFieldValue("gender", val)}
                    error={touched.gender && errors.gender}
                  />
                  {touched.gender && errors.gender && (
                    <Text style={CommonStyles.errorText}>{errors.gender}</Text>
                  )}

                  {/* Tempat Lahir */}
                  <TextInput
                    mode="outlined"
                    label="Tempat Lahir"
                    placeholder="Masukkan tempat lahir"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("birth_place")}
                    onBlur={handleBlur("birth_place")}
                    value={values.birth_place}
                    error={touched.birth_place && errors.birth_place}
                  />
                  {touched.birth_place && errors.birth_place && (
                    <Text style={CommonStyles.errorText}>
                      {errors.birth_place}
                    </Text>
                  )}

                  {/* Tanggal Lahir */}
                  {Platform.OS === "web" ? (
                    // Use a regular input for web
                    <WebDateInput
                      value={formatDate(values.birth_date)}
                      onChange={(date) => setFieldValue("birth_date", date)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <TextInput
                        mode="outlined"
                        label="Tanggal Lahir"
                        placeholder="Masukkan tanggal lahir"
                        value={values.birth_date ? formatDate(values.birth_date) : ""}
                        style={CommonStyles.paperInput}
                        outlineColor={COLORS.gray2}
                        activeOutlineColor={COLORS.primary}
                        editable={false}
                        right={
                          <TextInput.Icon
                            icon="calendar"
                            onPress={() => setShowDatePicker(true)}
                          />
                        }
                      />
                    </TouchableOpacity>
                  )
                  }
                  {touched.birth_date && errors.birth_date && (
                    <Text style={CommonStyles.errorText}>{errors.birth_date}</Text>
                  )}

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

                  {/* Agama */}
                  <PaperDropdown
                    label="Agama"
                    placeholder="Pilih agama"
                    value={values.religion}
                    options={religionOptions}
                    onSelect={(val) => setFieldValue("religion", val)}
                    error={touched.religion && errors.religion}
                  />
                  {touched.religion && errors.religion && (
                    <Text style={CommonStyles.errorText}>{errors.religion}</Text>
                  )}

                  {/* Nomor HP */}
                  <TextInput
                    mode="outlined"
                    label="Nomor HP"
                    placeholder="Masukkan nomor HP"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                    keyboardType="phone-number-pad"
                    error={touched.phone_number && errors.phone_number}
                  />
                  {touched.phone_number && errors.phone_number && (
                    <Text style={CommonStyles.errorText}>{errors.phone_number}</Text>
                  )}

                  {/* Button Submit */}
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={[
                      CommonStyles.paperButton,
                      { backgroundColor: COLORS.primary },
                    ]}
                    labelStyle={CommonStyles.paperButtonLabel}
                  >
                    Next
                  </Button>
                </View>
              )
            }}
          </Formik>
        </View>
      </ScrollView >
    </SafeAreaView >
  );
};

export default BiodataScreen;
