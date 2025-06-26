
import { Colors } from "@/constants/Colors"
import { useThemeColors } from "@/hooks/useThemeColors"
import React from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"
import { isTablet } from "react-native-device-info"
import { RFValue } from "react-native-responsive-fontsize"

const styles = StyleSheet.create({

	title: {

		fontSize: 50,
		fontFamily: "OptiCopper-Heavy"
	},

	cardTitle: {

		fontSize: 18,
		fontFamily: "OptiCopper-Heavy"

	},

	cardSubtitle: {

		fontSize: 23,
		fontFamily: "Calibri-bold",

	},

	paragraphPopup: {

		fontSize: isTablet() ? RFValue(15) : RFValue(18),
		fontFamily: "Calibri-regular"
	},

	altImage: {

		fontSize: 25,
		fontFamily: "Calibri-bold"
	},

	navbarHeader: {

		fontSize: 30,
		fontFamily: "Calibri-regular"
	},

	specialElementsPopup: {

		fontSize: 30,
		fontFamily: "Calibri-bold"
	},

	paragraph: {

		fontSize: 35,
		fontFamily: "Calibri-regular"

	},

	popupTitle: {

		fontSize: 35,
		fontFamily: "Calibri-bold"

	},

	contentBtn: {

		fontSize: 40,
		fontFamily: "Calibri-regular"

	},

})

//On importe les types de texts par défaut de réact native et on ajoute les notres
type Props = TextInputProps & {

	variant?: keyof typeof styles,
	color?: keyof typeof Colors["dark"]

}

export const ThemedTextInput = React.forwardRef<TextInput, Props>(
	({variant, color, style, ...rest}, ref) => {

	const colors = useThemeColors();

	//On retourne tout les autres paramètres qu'on ne touche pas dans la balise.
	//Pas tout tout compris
	return ( <TextInput ref={ref} maxLength={22} style={[styles[variant ?? "paragraph"], {color: colors[color ?? "subtitlesParags"]}, style]} {...rest}/> );
});

ThemedTextInput.displayName = "ThemedTextInput";