import { useThemeColors } from '@/hooks/useThemeColors'
import { globalStates } from '@/utils/globalStates'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'

type RenderActionBtnProps = {

	state: boolean,
	setState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RenderActionBtn({state, setState}: RenderActionBtnProps) {

	const colors = useThemeColors();

	const styles = StyleSheet.create({

		actionBtn: {
	
			position: 'absolute',
			right: Dimensions.get("window").height * 0.05,
			bottom: Dimensions.get("window").height * 0.05,
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
			right: Dimensions.get("window").height * 0.05,
			bottom: Dimensions.get("window").height * 0.05,
			padding: "2%",
			backgroundColor: colors["contrasts"],
			borderRadius: 9999,
			alignItems: 'center',
			justifyContent: 'center',
		},
	})

  return (

	<TouchableOpacity style={ state ? styles.actionBtnActivated : styles.actionBtn} onPress={() => {
		
		globalStates.actionBtnState = !state
		setState(!state)

	}}>

		<MaterialIcons name="touch-app" size={60} color={ state ? colors["background"] : colors["contrasts"]} />

	</TouchableOpacity>

  )
}