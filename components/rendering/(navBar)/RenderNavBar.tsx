import { RefreshContext } from '@/contexts/HomeRefreshContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import style from "./navBarCSS";

type RenderNavBarProps = {

	state: boolean,
	setState: React.Dispatch<React.SetStateAction<boolean>>,
	title?: string,
}

export default function RenderNavBar({state, setState}: RenderNavBarProps) {

	const colors = useThemeColors();
	const historyListCategories = useContext(RefreshContext)!.historyListCategories;

	const [navBarTitle, setNavBarTitle] = useState(historyListCategories[historyListCategories.length -1].name);

	const styles = style(colors, state);

	useEffect(() => {

		setNavBarTitle(historyListCategories[historyListCategories.length -1].name)

	}, [historyListCategories])

	//const inputRef = useRef<TextInput>(null); //Pour le focus d'input grace à une icone

	//function focusSearchInput(){

	//	if (inputRef.current) {

	//		inputRef.current.focus();

	//	}

	//};


  return (

	<View style={styles.header}>

		<View style={styles.headerLeft}>
		
			<ThemedText variant='navbarHeader' color={state ? "background" : "contrasts"} style={{marginRight: 10}}>{navBarTitle}</ThemedText>

			{/*<TouchableOpacity onPress={focusSearchInput}>

				<Feather name="search" size={30} color={state ? colors["background"] : colors["contrasts"]} style={{marginLeft: 8, marginRight: 8}} />

			</TouchableOpacity>

			<ThemedTextInput
				ref={inputRef}
				style={styles.searchInput}
				placeholder=""
				placeholderTextColor="#aaa"
				multiline={false}
			/>*/}

		</View>

		<View style={styles.headerRight}>
		
			<ThemedText variant='navbarHeader' color={state ? "background" : "titlesVisuals"} onPress={() => {

				router.push("/");

			}}>Déconnexion</ThemedText>

		</View>

	</View>
  )
}