import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SplashScreen from "./splash";
import LoginScreen from "./login";

export default function Index() {
  const router = useRouter();
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
  });
  return <>{isShowSplash ? <SplashScreen /> : <LoginScreen />}</>;
}
