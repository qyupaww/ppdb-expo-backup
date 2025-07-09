import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useFormBackHandler = (onBackPress) => {
  useEffect(() => {
    const handler = () => {
      onBackPress?.();
      return true;
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", handler);
    return () => subscription.remove();
  }, [onBackPress]);
};
