import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { COLORS } from "@/components/style";
import { FormProvider } from "@/context/FormContext";
import FormWatcher from "@/components/FormWatcher";

const FormLayout = () => {
  return (
    <FormProvider>
      <FormWatcher>
        <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="biodata" options={{ title: "Biodata" }} />
          <Stack.Screen name="address" options={{ title: "Address" }} />
          <Stack.Screen name="parents" options={{ title: "Parents" }} />
          <Stack.Screen name="confirmation" options={{ title: "confirmation" }} />
        </Stack>
      </FormWatcher>
    </FormProvider>
  );
};

export default FormLayout;
