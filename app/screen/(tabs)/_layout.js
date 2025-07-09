import { Tabs } from "expo-router/tabs";
import { StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/components/style";

const ScreenLayout = () => {
  return (
    <>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.gray,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopWidth: 1,
            borderTopColor: COLORS.gray2,
          },
        }}
      >
        {/* Tab Home */}
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            headerTitle: "Home",
            tabBarIcon: ({ color, size }) => (
              <Feather name="home" size={size} color={color} />
            ),
          }}
        />

        {/* Tab Profile */}
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            headerTitle: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Feather name="user" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default ScreenLayout;
