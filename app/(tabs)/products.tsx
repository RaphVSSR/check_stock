
import RenderActionBtn from '@/components/rendering/RenderActionBtn';
import RenderNavBar from '@/components/rendering/RenderNavBar';
import RenderProducts from '@/components/rendering/RenderProducts';
import { useThemeColors } from '@/hooks/useThemeColors';
import { globalStates } from '@/utils/globalStates';
import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function Home(){

	const colors = useThemeColors();
	const [actionBtnState, setActionBtnState] = useState(globalStates.actionBtnState);
	const [emptyProducts, setEmptyProducts] = useState(true);

	const styles = StyleSheet.create({

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

	//Synchro l'état du bouton d'action -> parce que le fonctionnement du useState
	useFocusEffect(

		React.useCallback(() => {

			setActionBtnState(globalStates.actionBtnState);

		}, [])
	
	);

  return (
	

	<SafeAreaView style={styles.container}>

		<RenderNavBar state={actionBtnState} setState={setActionBtnState}/>

		<ImageBackground
		
			style={styles.contentContainer}
			source={emptyProducts ? require("@/assets/images/panier_produits.png") : null}
			contentFit='none'
			imageStyle={{opacity: 0.5, transform: [{scale: 6}]}}
			
		>

			<RenderProducts state={actionBtnState} onEmptyChange={setEmptyProducts}/>

		</ImageBackground>
		
		<RenderActionBtn state={actionBtnState} setState={setActionBtnState}/>

	</SafeAreaView>

  )
}