import { Colors } from "@/constants/Colors"
import { useThemeColors } from "@/hooks/useThemeColors"
import React from "react"
import { StyleSheet, TextInput, TextInputProps } from "react-native"

const styles = StyleSheet.create({
  // ... (tes styles inchangés)
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
    fontSize: 25,
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

/**
 * Champ de saisie numérique thémé, avec les mêmes variantes de styles que ThemedTextInput.
 * - Le clavier affiché sera numérique.
 * - La saisie sera limitée aux chiffres (et éventuellement au point/décimale selon le type de clavier).
 */
export const ThemedNumberInput = React.forwardRef<TextInput, Props>(
  ({ variant, color, style, onChangeText, ...rest }, ref) => {

    const colors = useThemeColors();

	const handleChange = (text: string) => {

		// Autorise uniquement les chiffres et un seul point décimal
		let filtered = text.replace(/[^0-9]/g, '');
		// Empêche plusieurs points décimaux
		const parts = filtered.split('.');
		if (parts.length > 2) {
			filtered = parts[0] + '.' + parts.slice(1).join('');
		}
		if (onChangeText) {
			onChangeText(filtered);
		}
	}

    return (

      <TextInput
        ref={ref}
        style={[
          styles[variant ?? "paragraph"],
          { color: colors[color ?? "subtitlesParags"] },
          style
        ]}
        keyboardType="numeric"
        inputMode="numeric"
		onChangeText={handleChange}
        {...rest}
      />

    );
  }
);

ThemedNumberInput.displayName = "ThemedNumberInput";