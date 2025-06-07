import { useThemeColors } from '@/hooks/useThemeColors'
import global from '@/utils/global'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { isTablet } from 'react-native-device-info'

type RenderActionBtnProps = {

	state: boolean,
	setState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RenderActionBtn({state, setState}: RenderActionBtnProps) {

	const colors = useThemeColors();

	const { width, height } = Dimensions.get("window");

	const styles = StyleSheet.create({

		actionBtn: {
	
			position: 'absolute',
			right: height * 0.05,
			bottom: height * 0.08,
			padding: "2%",
			backgroundColor: colors["background3"],
			borderRadius: 9999,
			alignItems: 'center',
			justifyContent: 'center',
			borderWidth: 4,
			borderColor: colors["background2"],
		},

		actionBtnActivated: {
	
			position: 'absolute',
			right: height * 0.05,
			bottom: height * 0.08,
			padding: "2%",
			backgroundColor: colors["contrasts"],
			borderRadius: 9999,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})

  return (

	<TouchableOpacity style={ state ? styles.actionBtnActivated : styles.actionBtn} onPress={() => {
		
		global.btnState = !state
		setState(!state)

	}}>

		<MaterialIcons name="touch-app" size={isTablet() ? width * 0.1 : width * 0.15} color={ state ? colors["background"] : colors["contrasts"]} />

	</TouchableOpacity>

  )
}