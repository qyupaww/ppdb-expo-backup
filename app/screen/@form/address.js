import React, { useRef, useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { TextInput, ProgressBar, Text, Button } from "react-native-paper";
import { COLORS, CommonStyles } from "@/components/style";
import { useForm } from "@/context/FormContext";
import ZoneSelect from "@/components/ZoneSelect";
import { useFormBackHandler } from "@/hooks/useFormBackHandler";

const AddressSchema = Yup.object().shape({
  address: Yup.string().required("Alamat wajib diisi"),
  rt: Yup.string().required("RT wajib diisi"),
  rw: Yup.string().required("RW wajib diisi"),
  village_id: Yup.number().required("Kelurahan wajib diisi"),
  district_id: Yup.number().required("Kecamatan wajib diisi"),
  regency_id: Yup.number().required("Kota wajib diisi"),
  province_id: Yup.number().required("Provinsi wajib diisi"),
  postal_code: Yup.string()
    .matches(/^\d+$/, "Kode pos harus berupa angka")
    .required("Kode pos wajib diisi"),
});

const AddressScreen = () => {
  const router = useRouter();
  const { formData, updateFormData } = useForm();
  const valuesRef = useRef(null);

  return (
    <SafeAreaView style={[CommonStyles.container, { flex: 1 }]}>
      <View style={CommonStyles.progressContainer}>
        <Text style={CommonStyles.stepText}>Step 2 of 4</Text>
        <ProgressBar
          progress={2 / 4}
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
              address: formData.address || "",
              rt: formData.rt || "",
              rw: formData.rw || "",
              village_id: formData.village_id || "",
              district_id: formData.district_id || "",
              regency_id: formData.regency_id || "",
              province_id: formData.province_id || "",
              postal_code: formData.postal_code || "",
            }}
            enableReinitialize={true}
            validationSchema={AddressSchema}
            onSubmit={(values) => {
              updateFormData(values);
              router.push("/screen/@form/parents");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
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
                    Informasi Alamat
                  </Text>
                  {[
                    { name: "address", label: "Alamat", multiline: true },
                    { name: "rt", label: "RT", keyboardType: "numeric" },
                    { name: "rw", label: "RW", keyboardType: "numeric" },
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
                        multiline={field.multiline || false}
                        keyboardType={field.keyboardType || "default"}
                      />
                      {touched[field.name] && errors[field.name] && (
                        <Text style={CommonStyles.errorText}>
                          {errors[field.name]}
                        </Text>
                      )}
                    </View>
                  ))}

                  <ZoneSelect
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />

                  <TextInput
                    mode="outlined"
                    label="Kode Pos"
                    placeholder="Masukkan kode pos"
                    style={CommonStyles.paperInput}
                    outlineColor={COLORS.gray2}
                    activeOutlineColor={COLORS.primary}
                    onChangeText={handleChange("postal_code")}
                    onBlur={handleBlur("postal_code")}
                    value={values.postal_code}
                    error={touched.postal_code && errors.postal_code}
                    keyboardType="numeric"
                  />
                  {touched.postal_code && errors.postal_code && (
                    <Text style={CommonStyles.errorText}>
                      {errors.postal_code}
                    </Text>
                  )}

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

export default AddressScreen;
