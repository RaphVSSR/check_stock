import { Platform, StatusBar, StyleSheet } from "react-native";

export default (colors: any) => StyleSheet.create({

	container: {

		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //Force l'espace avec les barres d'informatioins de l'appareil
	
		backgroundColor: colors["background"],
	},

	contentContainer: {

		flex: 1,
		paddingHorizontal: "5%",
		paddingTop: "2%",
		backgroundColor: colors["background2"],

	},

})