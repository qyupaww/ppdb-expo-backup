import { View, Text } from "react-native";
import ProtectedRoute from "@/components/ProtectedRoute";

const ProfileScreen = () => {
  return (
    <ProtectedRoute>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </ProtectedRoute>
  );
};

export default ProfileScreen;
