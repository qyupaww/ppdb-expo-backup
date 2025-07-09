import { useEffect } from "react";
import { useRouter, usePathname } from "expo-router";
import { useForm } from "@/context/FormContext";
import { Alert, BackHandler, Platform } from "react-native";

const confirmLeave = (onConfirm) => {
  if (Platform.OS === "web") {
    const shouldLeave = window.confirm(
      "Keluar dari halaman ini akan menghapus data formulir. Yakin ingin keluar?"
    );
    if (shouldLeave) onConfirm();
  } else {
    Alert.alert(
      "Keluar dari Form?",
      "Keluar dari halaman ini akan menghapus data formulir. Yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Ya, keluar",
          style: "destructive",
          onPress: onConfirm,
        },
      ]
    );
  }
};

export default function FormWatcher({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { formData, resetFormData, isFormDirty } = useForm();

  const isFormPage = pathname.startsWith("/screen/@form/");
  const isBiodataPage = pathname === "/screen/@form/biodata";

  // Handle manual push (ex: router.push('/home'))
  useEffect(() => {
    const originalPush = router.push;

    router.push = (url, ...args) => {
      const isLeavingForm = isFormPage && !url.startsWith("/screen/@form/");
      if (isLeavingForm && isBiodataPage && isFormDirty) {
        confirmLeave(() => {
          resetFormData();
          originalPush(url, ...args);
        });
      } else {
        originalPush(url, ...args);
      }
    };

    return () => {
      router.push = originalPush;
    };
  }, [router, pathname, isFormDirty]);

  // Handle native back button (Android)
  useEffect(() => {
    if (Platform.OS === "android" && isBiodataPage && isFormDirty) {
      const onBackPress = () => {
        confirmLeave(() => {
          resetFormData();
          router.back();
        });
        return true; // Block default back behavior
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => backHandler.remove();
    }
  }, [isBiodataPage, isFormDirty]);

  // Handle browser back button on web
  useEffect(() => {
    if (Platform.OS === "web" && isBiodataPage && isFormDirty) {
      const onBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "Keluar dari halaman ini akan menghapus data formulir.";
      };
      window.addEventListener("beforeunload", onBeforeUnload);
      return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }
  }, [isBiodataPage, isFormDirty]);

  return children;
}
