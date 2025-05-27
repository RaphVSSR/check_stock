import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Index() {

  const router = useRouter();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  
  const colors = useThemeColors();
  
  const styles = StyleSheet.create({

    container: {

      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //Force l'espace avec les barres d'informatioins de l'appareil

      padding: "10%",
      backgroundColor: colors["background"],
      justifyContent: "center",
      alignItems: "center"

    },

    logoView: {

      flex: 1/2,
      justifyContent: "center",

    },

    logo: {

      width: 350,
      height: 350

    },

    formContainer: {

      flex: 1/3,
      width: "100%",

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

      backgroundColor: colors["contrasts"],
      borderRadius: 13,
      marginTop: 20,
      padding: 10,
      alignItems: "center"

    },

  });

  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.logoView}>

        <Image 

          style={styles.logo}
          source={require("@/assets/images/logo_entreprise.png")}
        
        />

      </View>

      <View style={styles.formContainer}>

        <View style={styles.form}>

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

        </View>

        <TouchableOpacity style={styles.button} onPress={() => {
          
          if (user === "test" && pass === "test1234") {

            router.push("/home");
            
          }

        }}>

          <ThemedText variant="specialElementsPopup" color="background">Se connecter</ThemedText>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );
}
