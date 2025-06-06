import { ThemedText } from '@/components/ThemedText';
import { unitBtn } from '@/constants/styles';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function RenderUnitBtn({unitName, state, onPress}: {unitName: string, state: boolean, onPress: () => void}){

	const colors = useThemeColors();
	const styles = unitBtn(colors);

  return (

	<TouchableOpacity style={state ? styles.unitBtnActivated : styles.unitBtn} onPress={onPress}>
		
		<ThemedText variant='specialElementsPopup' color={state ? "background" : "titlesVisuals"}>{unitName}</ThemedText>
		
	</TouchableOpacity>

  )

}