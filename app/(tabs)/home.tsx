
import RenderAddCategoryModal from '@/components/rendering/modals/categories/RenderAddCategoryModal';
import RenderDelCategoryModal from '@/components/rendering/modals/categories/RenderDelCategoryModal';
import RenderModCategoryModal from '@/components/rendering/modals/categories/RenderModCategoryModal';
import RenderActionBtn from '@/components/rendering/RenderActionBtn';
import RenderCategories from '@/components/rendering/RenderCategories';
import RenderNavBar from '@/components/rendering/RenderNavBar';
import { useThemeColors } from '@/hooks/useThemeColors';
import { globalStates } from '@/utils/globalStates';
import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

export default function Home(){

	const colors = useThemeColors();
	const [actionBtnState, setActionBtnState] = useState(globalStates.actionBtnState);
	const [emptyCategories, setEmptyCategories] = useState(true);

	const [addCategoryModalVisibility, setAddCategoryModalVisibility] = useState(false);
	const [delCategoryModalVisibility, setDelCategoryModalVisibility] = useState(false);
	const [modCategoryModalVisibility, setModCategoryModalVisibility] = useState(false);
	const [categoryActionName, setCategoryActionName] = useState<string|null>(null);

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

		<RenderModCategoryModal visibility={modCategoryModalVisibility} setModalVisibility={setModCategoryModalVisibility} categoryActionName={categoryActionName as string}/>

		<RenderDelCategoryModal visibility={delCategoryModalVisibility} setModalVisibility={setDelCategoryModalVisibility} categoryName={categoryActionName as string}/>

		<RenderAddCategoryModal visibility={addCategoryModalVisibility} setModalVisibility={setAddCategoryModalVisibility}/>

		<ImageBackground
		
			style={styles.contentContainer}
			source={emptyCategories ? require("@/assets/images/boulanger.png") : null}
			contentFit='contain'
			imageStyle={{opacity: 0.5}}
			
		>

			<RenderCategories 
				state={actionBtnState} 
				onEmptyChange={setEmptyCategories} 
				setAddModalVisibility={setAddCategoryModalVisibility} setDelCategoryModalVisibility={setDelCategoryModalVisibility} 
				setModCategoryModalVisibility={setModCategoryModalVisibility}setCategoryActionName={setCategoryActionName}/>
			
		</ImageBackground>
		
		<RenderActionBtn state={actionBtnState} setState={setActionBtnState}/>

	</SafeAreaView>

  )
}