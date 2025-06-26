import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

const {width, height} = Dimensions.get("window");


export default (colors:any) => StyleSheet.create({

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