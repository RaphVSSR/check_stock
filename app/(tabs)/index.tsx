import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import global from "@/utils/global";
import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export default function Index() {

  const router = useRouter();

  //const [user, setUser] = useState("");
  //const [pass, setPass] = useState("");

  const colors = useThemeColors();

  const {width, height} = Dimensions.get("window");


  const styles = StyleSheet.create({

    container: {

      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //Force l'espace avec les barres d'informatioins de l'appareil

      paddingVertical: "10%",
      paddingHorizontal: "10%",
      backgroundColor: colors["background"],
    },

    contentWrapper: {

      flex: 1,
      justifyContent: "center",
      alignItems: "center",

    },

    titleContainer: {

      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 0,
      marginBottom: 30,

    },

    logoView: {

      flex: 1/3,
      justifyContent: "center",

    },

    logo: {

      width: width * 0.5,
      height: height * 0.5,
      resizeMode: "contain",

    },

    formContainer: {

      flex: 1/3,
      width: "100%",
      justifyContent: "space-around",
      alignItems: "center"

    },

    form: {

      width: '100%',
      padding: 20,
      marginBottom: 30,
      justifyContent: "space-between",
      borderRadius: 20,
      backgroundColor: colors["background3"],

    },

    input: {

      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: '#fff',
      marginBottom: 20,

    },

    button: {

      width: "100%",
      backgroundColor: colors["contrasts"],
      borderRadius: 13,
      marginTop: 20,
      padding: 10,
      alignItems: "center"

    },

  });

  useFocusEffect(

    React.useCallback(() => {

      global.btnState && (global.btnState = false);

    }, [])

  );

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.contentWrapper}>

        <View style={styles.logoView}>

          <Image 

            style={styles.logo}
            source={require("@/assets/images/logo_entreprise.png")}
          
          />

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

          <TouchableOpacity style={styles.button} onPress={() => { router.push("/home"); }}>

            <ThemedText variant="specialElementsPopup" color="background">Se connecter</ThemedText>

          </TouchableOpacity>

        </View>

      </View>

      <ThemedText style={{ width: "100%", textAlign: "center", fontSize: RFValue(12), marginBottom: 15}} variant="paragraphPopup" color="subtitlesParags">Developped by VASSEUR Raphaël</ThemedText>

    </SafeAreaView>

  );
}
