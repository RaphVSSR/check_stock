
import { Colors } from "@/constants/Colors"
import { useThemeColors } from "@/hooks/useThemeColors"
import { StyleSheet, Text, TextProps } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"

const styles = StyleSheet.create({

	title: {

		fontSize: RFValue(20),
		fontFamily: "OptiCopper-Heavy"
	},

	cardTitle: {

		fontSize: RFValue(12),
		fontFamily: "OptiCopper-Heavy"

	},

	cardSubtitle: {

		fontSize: RFValue(17),
		fontFamily: "Calibri-bold",

	},

	paragraphPopup: {

		fontSize: RFValue(18),
		fontFamily: "Calibri-regular"
	},

	altImage: {

		fontSize: 25,
		fontFamily: "Calibri-bold"
	},

	navbarHeader: {

		fontSize: RFValue(18),
		fontFamily: "Calibri-regular"
	},

	specialElementsPopup: {

		fontSize: RFValue(20),
		fontFamily: "Calibri-bold"
	},

	paragraph: {

		fontSize: RFValue(18),
		fontFamily: "Calibri-regular"

	},

	popupTitle: {

		fontSize: RFValue(23),
		fontFamily: "Calibri-bold"

	},

	contentBtn: {

		fontSize: 40,
		fontFamily: "Calibri-regular"

	},

})

//On importe les types de texts par défaut de réact native et on ajoute les notres
type Props = TextProps & {

	variant?: keyof typeof styles,
	color?: keyof typeof Colors["dark"]

}

export function ThemedText ({variant, color, style, ...rest}: Props){

	const colors = useThemeColors();

	//On retourne tout les autres paramètres qu'on ne touche pas dans la balise.
	//Pas tout tout compris
	return <Text style={[styles[variant ?? "paragraph"], {color: colors[color ?? "subtitlesParags"]}, style]} {...rest}/> 
}