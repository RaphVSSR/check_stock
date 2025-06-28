import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { useFocusEffect, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import style from "./indexCSS";


export default function Index() {

  const router = useRouter();
  const [fontsLoaded] = useFonts({
		
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
  
  });
  const [appIsReady, setAppIsReady] = useState(false);
  const [enterpriseAssetsExists, setEnterpriseAssetsExists] = useState<boolean | null>(null);

  //const [user, setUser] = useState("");
  //const [pass, setPass] = useState("");

  const colors = useThemeColors();

  const styles = style(colors);

  useEffect(() => {

    (async function prepareLoading() {

      try {
        
        await Asset.loadAsync([

          require('@/assets/images/boulanger.png'),
          require('@/assets/images/panier_produits.png'),

        ]);

      } catch (e) {

        console.warn(e);

      } finally {

        setAppIsReady(true);

      }

    })()

  }, [])

  useFocusEffect(

    React.useCallback(() => {

      global.btnState && (global.btnState = false);

    }, [])

  );

  const onLayoutRootView = useCallback(() => {

    if (appIsReady && fontsLoaded) {

      SplashScreen.hideAsync();

    }

  }, [appIsReady, fontsLoaded]);


  if (!appIsReady || !fontsLoaded) {

    return null;

  }else{

    return (

      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>

        <View style={styles.contentWrapper}>

          <View style={styles.logoView}>
            
            {/*<Image style={styles.logo} source={require("@/assets/images/logo_entreprise.png")}/>*/}

            <View style={styles.logoPlaceholder}><ThemedText variant="title" color="background">Logo</ThemedText></View>

          </View>

          <View style={styles.formContainer}>

            <View style={styles.titleContainer}>

              <ThemedText variant="title" color="titlesVisuals">Check&Stock</ThemedText>
              <ThemedText style={{textAlign: "center"}} variant="paragraph" color="subtitlesParags">Gestionnaire d&apos;inventaire professionnel</ThemedText>

            </View>

            {/*<View style={styles.form}>

              <ThemedTextInput

                style={styles.input}
                variant="paragraphPopup"
                placeholder="Utilisateur"
                placeholderTextColor={colors["subtitlesParags"]}
                color="titlesVisuals"
                value={user}
                onChangeText={setUser}

              />

              <ThemedTextInput

                style={styles.input}
                variant="paragraphPopup"
                placeholder="Mot de passe"
                placeholderTextColor={colors["subtitlesParags"]}
                color="titlesVisuals"
                secureTextEntry
                value={pass}
                onChangeText={setPass}

              />

            </View>*/}

            <TouchableOpacity style={styles.button} onPress={() => { router.push("/Home"); }}>

              <ThemedText variant="specialElementsPopup" color="background">Se connecter</ThemedText>

            </TouchableOpacity>

          </View>

        </View>

        <ThemedText style={{ width: "100%", textAlign: "center", fontSize: RFValue(12), marginBottom: 15}} variant="paragraphPopup" color="subtitlesParags">Developped by VASSEUR Raphaël</ThemedText>

      </SafeAreaView>

    );
  }
}
