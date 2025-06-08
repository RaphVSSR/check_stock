import { Stack } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";


export default function RootLayout() {
  
  useEffect(() => {

    (async () => await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT))();

  }, []);

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
