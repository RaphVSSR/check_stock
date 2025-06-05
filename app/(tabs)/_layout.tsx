import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
  
    <SQLiteProvider
			databaseName="appBase.db"
			assetSource={{ assetId: require('@/assets/database/appBase.db') }}
		>
        <Stack
        
          screenOptions={{

            headerShown: false,

            //On force les themes du fait que l'on en ai qu'un
            statusBarStyle: "light"
            //statusBarStyle: (useColorScheme() ?? "dark") === "dark" ? "light" : "dark"

          }}
        
        />
        
    </SQLiteProvider>
  
  );
}
