import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Text, Button, ProgressBar } from "react-native-paper";
import { useRouter } from "expo-router";
import { COLORS, CommonStyles } from "@/components/style";
import { useForm } from "@/context/FormContext";
import { registration } from "@/api/student/registration";

const ConfirmationScreen = () => {
  const router = useRouter();
  const { formData, resetFormData } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await registration(formData);
      setSuccess(true);
      resetFormData();
    } catch (error) {
      console.log("Submit error:", error.response?.data);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    router.replace("/screen/home");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={[CommonStyles.container, { flex: 1 }]}>
      {/* Progress Bar */}
      <View style={CommonStyles.progressContainer}>
        <Text style={CommonStyles.stepText}>Step 4 of 4</Text>
        <ProgressBar
          progress={4 / 4}
          color={COLORS.primary}
          style={CommonStyles.progressBar}
        />
      </View>

      <ScrollView
        contentContainerStyle={[
          CommonStyles.scrollViewContent,
          { justifyContent: "center", flexGrow: 1 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={CommonStyles.paperContainer}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : success === null ? (
            <>
              <Text
                style={{
                  fontFamily: "Lexend-Deca-Bold",
                  fontSize: 20,
                  textAlign: "center",
                  marginBottom: 12,
                  color: "#000",
                }}
              >
                Konfirmasi Pendaftaran
              </Text>

              <Text
                style={{
                  fontFamily: "Lexend-Deca-Regular",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 24,
                  color: "#555",
                }}
              >
                Mohon periksa kembali data pendaftaran Anda sebelum mengirim.
                Jika sudah yakin, silakan klik tombol "Kirim" di bawah ini.
              </Text>


              <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
                <Button
                  mode="outlined"
                  onPress={handleBack}
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
                  Kembali
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[
                    CommonStyles.paperButton,
                    { backgroundColor: COLORS.primary, flex: 1 },
                  ]}
                  labelStyle={CommonStyles.paperButtonLabel}
                >
                  Kirim
                </Button>
              </View>
            </>
          ) : success ? (
            <>
              <Text
                style={{
                  fontFamily: "Lexend-Deca-Bold",
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: 12,
                  color: "#000",
                }}
              >
                Pendaftaran Berhasil
              </Text>

              <Text
                style={{
                  fontFamily: "Lexend-Deca-Regular",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 24,
                  color: "#555",
                }}
              >
                Data pendaftaran Anda telah berhasil dikirim. Silakan menunggu informasi
                selanjutnya melalui pengumuman resmi dari sekolah.
              </Text>

              <Button
                mode="contained"
                onPress={handleDone}
                style={[
                  CommonStyles.paperButton,
                  { backgroundColor: COLORS.primary },
                ]}
                labelStyle={CommonStyles.paperButtonLabel}
              >
                OK
              </Button>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: "Lexend-Deca-Bold",
                  fontSize: 20,
                  textAlign: "center",
                  marginBottom: 12,
                  color: "#000",
                }}
              >
                Gagal Mengirim
              </Text>

              <Text
                style={{
                  fontFamily: "Lexend-Deca-Regular",
                  fontSize: 16,
                  textAlign: "center",
                  marginBottom: 24,
                  color: "#555",
                }}
              >
                Terjadi kesalahan saat mengirim data. Silakan coba lagi nanti.
              </Text>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
                <Button
                  mode="outlined"
                  onPress={handleBack}
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
                  Kembali
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={[
                    CommonStyles.paperButton,
                    { backgroundColor: COLORS.primary, flex: 1 },
                  ]}
                  labelStyle={CommonStyles.paperButtonLabel}
                >
                  Coba Lagi
                </Button>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmationScreen;
