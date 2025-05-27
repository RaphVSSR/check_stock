import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  
    <Stack
    
      screenOptions={{

        headerShown: false,

        //On force les themes du fait que l'on en ai qu'un
        statusBarStyle: "light"
        //statusBarStyle: (useColorScheme() ?? "dark") === "dark" ? "light" : "dark"

      }}
    
    />
  
  );
}
