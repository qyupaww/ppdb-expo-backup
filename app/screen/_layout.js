import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { StatusBar, View, Text, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { COLORS, FONTS, CommonStyles } from "@/components/style";
import { useAuth } from "@/context/AuthProvider";
import DefaultUserImage from "@/assets/user.png";

const CustomDrawerContent = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, authLogout } = useAuth();

  const drawerItemStyle = {
    paddingVertical: 0,
    borderRadius: 0,
  };

  const getDrawerItemStyle = (currentPath) => ({
    ...drawerItemStyle,
    backgroundColor: currentPath ? COLORS.primary : COLORS.background,
  });

  const getIconColor = (currentPath) =>
    currentPath ? COLORS.white : COLORS.black;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[CommonStyles.container, styles.container]}
    >
      <View style={styles.profileContainer}>
        <Image
          source={DefaultUserImage}
          style={styles.profileImage}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>
      {/* Home */}
      <DrawerItem
        icon={({ size }) => (
          <Feather
            name="home"
            size={size - 4}
            color={getIconColor(pathname === "/screen/home")}
          />
        )}
        label="Home"
        labelStyle={[
          FONTS.body4,
          {
            color: getIconColor(pathname === "/screen/home"),
          },
        ]}
        style={getDrawerItemStyle(pathname === "/screen/home")}
        onPress={() => router.push("/screen/(tabs)/home")}
      />

      {/* Profile */}
      <DrawerItem
        icon={({ size }) => (
          <Feather
            name="user"
            size={size - 4}
            color={getIconColor(pathname === "/screen/profile")}
          />
        )}
        label="Profile"
        labelStyle={[
          FONTS.body4,
          {
            color: getIconColor(pathname === "/screen/profile"),
          },
        ]}
        style={getDrawerItemStyle(pathname === "/screen/profile")}
        onPress={() => router.push("/screen/(tabs)/profile")}
      />

      {/* Settings */}
      <DrawerItem
        icon={({ size }) => (
          <Feather
            name="settings"
            size={size - 4}
            color={getIconColor(pathname === "/screen/setting")}
          />
        )}
        label="Settings"
        labelStyle={[
          FONTS.body4,
          {
            color: getIconColor(pathname === "/screen/setting"),
          },
        ]}
        style={getDrawerItemStyle(pathname === "/screen/setting")}
        onPress={() => router.push("/screen/setting")}
      />

      {/* Logout */}
      <DrawerItem
        icon={({ size }) => (
          <Feather name="log-out" size={size - 4} color={COLORS.black} />
        )}
        label="Logout"
        labelStyle={[
          FONTS.body4,
          {
            color: COLORS.black,
          },
        ]}
        style={drawerItemStyle}
        onPress={async () => {
          await authLogout();
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 2,
  },
  profileEmail: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

const ScreenLayout = () => {
  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname.includes("/home")) return "";
    if (pathname.includes("/profile")) return "Profile";
    if (pathname.includes("/setting")) return "Settings";
    if (pathname.includes("/@form")) return "Form Pendaftaran";
    return "";
  };

  return (
    <>
      <StatusBar backgroundColor={COLORS.background} barStyle="dark-content" />
      <Drawer
        screenOptions={{
          drawerStyle: { width: "80%" },
          headerTitle: getHeaderTitle(),
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: getHeaderTitle(),
            headerTitleStyle: { fontSize: 16 },
          }}
        />
        <Drawer.Screen
          name="setting"
          options={{
            headerTitle: "Settings",
            headerTitleStyle: { fontSize: 16 },
          }}
        />
      </Drawer>
    </>
  );
};

export default ScreenLayout;
