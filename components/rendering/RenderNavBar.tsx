import { useThemeColors } from '@/hooks/useThemeColors';
import { Feather } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedTextInput } from '../ThemedTextInput';

type RenderNavBarProps = {

	state: boolean,
	setState: React.Dispatch<React.SetStateAction<boolean>>
}

export default function RenderNavBar({state, setState}: RenderNavBarProps) {

	const colors = useThemeColors();
	const inputRef = useRef<TextInput>(null); //Pour le focus d'input grace à une icone

	function focusSearchInput(){

		if (inputRef.current) {

			inputRef.current.focus();

		}

	};

	const styles = StyleSheet.create({

		header: {

			flexDirection: 'row',
			width: "100%",
			alignItems: 'center',
			paddingVertical: "2%",
			paddingHorizontal: "5%",
			backgroundColor: state ? colors["contrasts"] : colors["background"]
		},

		headerLeft: {

			flexDirection: 'row',
			flex: 1/2,
			marginRight: 8,
			alignItems: "center",
		},
		
		searchInput: {

			minWidth: 150,
			height: 30,
			fontSize: 23,
			paddingTop: 0,
			paddingBottom: 0,
			textAlignVertical: "bottom",
			color: state ? colors["background"] : colors["titlesVisuals"],
			borderBottomColor: state ? colors["background"] : colors["titlesVisuals"],
			borderBottomWidth: 1,
		},
		
		headerRight: {

			flex: 1/2,
			alignItems: "flex-end",
		},

	})


  return (

	<View style={styles.header}>

		<View style={styles.headerLeft}>
		
			<ThemedText variant='navbarHeader' color={state ? "background" : "contrasts"} style={{marginRight: 10}}>Accueil</ThemedText>

			<TouchableOpacity onPress={focusSearchInput}>

				<Feather name="search" size={30} color={state ? colors["background"] : colors["contrasts"]} style={{marginLeft: 8, marginRight: 8}} />

			</TouchableOpacity>

			<ThemedTextInput
				ref={inputRef}
				style={styles.searchInput}
				placeholder=""
				placeholderTextColor="#aaa"
				multiline={false}
			/>

		</View>

		<View style={styles.headerRight}>
		
			<ThemedText variant='navbarHeader' color={state ? "background" : "titlesVisuals"}>Nom compte</ThemedText>

		</View>

	</View>
  )
}