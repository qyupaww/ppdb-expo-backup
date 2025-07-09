import React, { useEffect, useRef } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { TextInput, ProgressBar, Text, Button } from "react-native-paper";
import { COLORS, CommonStyles } from "@/components/style";
import { useForm } from "@/context/FormContext";
import { useFormBackHandler } from "@/hooks/useFormBackHandler";

const ParentSchema = Yup.object().shape({
  father_name: Yup.string().required("Nama ayah wajib diisi"),
  father_job: Yup.string().required("Pekerjaan ayah wajib diisi"),
  father_phone_number: Yup.string(),
  mother_name: Yup.string().required("Nama ibu wajib diisi"),
  mother_job: Yup.string().required("Pekerjaan ibu wajib diisi"),
  mother_phone_number: Yup.string(),
});

const ParentsScreen = () => {
  const router = useRouter();
  const { formData, updateFormData } = useForm();
  const valuesRef = useRef(null);

  return (
    <SafeAreaView style={[CommonStyles.container, { flex: 1 }]}>
      <View style={CommonStyles.progressContainer}>
        <Text style={CommonStyles.stepText}>Step 3 of 4</Text>
        <ProgressBar
          progress={3 / 4}
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
            initialValues={{
              father_name: formData.father_name || "",
              father_job: formData.father_job || "",
              father_phone_number: formData.father_phone_number || "",
              mother_name: formData.mother_name || "",
              mother_job: formData.mother_job || "",
              mother_phone_number: formData.mother_phone_number || "",
            }}
            enableReinitialize={true}
            validationSchema={ParentSchema}
            onSubmit={(values) => {
              updateFormData(values);
              router.push("/screen/@form/confirmation");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              useEffect(() => {
                valuesRef.current = values;
              }, [values]);

              useFormBackHandler(() => {
                updateFormData(valuesRef.current);
                router.back();
              });

              return (
                <View style={CommonStyles.paperContainer}>
                  {/* Judul */}
                  <Text style={CommonStyles.paperTitle}>
                    Informasi Orang Tua
                  </Text>
                  {[
                    { name: "father_name", label: "Nama Ayah" },
                    { name: "father_job", label: "Pekerjaan Ayah" },
                    {
                      name: "father_phone_number",
                      label: "Nomor Telepon Ayah",
                      keyboardType: "phone-pad",
                    },
                    { name: "mother_name", label: "Nama Ibu" },
                    { name: "mother_job", label: "Pekerjaan Ibu" },
                    {
                      name: "mother_phone_number",
                      label: "Nomor Telepon Ibu",
                      keyboardType: "phone-pad",
                    },
                  ].map((field, index) => (
                    <View key={index}>
                      <TextInput
                        mode="outlined"
                        label={field.label}
                        placeholder={`Masukkan ${field.label.toLowerCase()}`}
                        style={CommonStyles.paperInput}
                        outlineColor={COLORS.gray2}
                        activeOutlineColor={COLORS.primary}
                        onChangeText={handleChange(field.name)}
                        onBlur={handleBlur(field.name)}
                        value={values[field.name]}
                        error={touched[field.name] && errors[field.name]}
                        keyboardType={field.keyboardType || "default"}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <Text style={CommonStyles.errorText}>
                          {errors[field.name]}
                        </Text>
                      )}
                    </View>
                  ))}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <Button
                      mode="outlined"
                      onPress={() => {
                        updateFormData(valuesRef.current);
                        router.back();
                      }}
                      style={[
                        CommonStyles.paperButton,
                        {
                          flex: 1,
                          marginRight: 5,
                          backgroundColor: COLORS.white,
                          borderColor: COLORS.primary,
                        },
                      ]}
                      labelStyle={[
                        CommonStyles.paperButtonLabel,
                        { color: COLORS.primary },
                      ]}
                    >
                      Back
                    </Button>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      style={[
                        CommonStyles.paperButton,
                        {
                          flex: 1,
                          marginLeft: 5,
                          backgroundColor: COLORS.primary,
                        },
                      ]}
                      labelStyle={CommonStyles.paperButtonLabel}
                    >
                      Next
                    </Button>
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ParentsScreen;
