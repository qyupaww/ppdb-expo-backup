import { View, Text } from "react-native";
import ProtectedRoute from "@/components/ProtectedRoute";

const SettingsScreen = () => {
  return (
    <ProtectedRoute>
      <View>
        <Text>Settings Screen</Text>
      </View>
    </ProtectedRoute>
  );
};

export default SettingsScreen;
