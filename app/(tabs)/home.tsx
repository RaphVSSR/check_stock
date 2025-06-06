
import RenderAddCategoryModal from '@/components/rendering/categories/modals/RenderAddCategoryModal';
import RenderDelCategoryModal from '@/components/rendering/categories/modals/RenderDelCategoryModal';
import RenderModCategoryModal from '@/components/rendering/categories/modals/RenderModCategoryModal';
import RenderCategories from '@/components/rendering/categories/RenderCategories';
import RenderActionBtn from '@/components/rendering/RenderActionBtn';
import RenderNavBar from '@/components/rendering/RenderNavBar';
import { basePage } from '@/constants/styles';
import { useThemeColors } from '@/hooks/useThemeColors';
import global from '@/utils/global';
import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

export default function Home(){

	const colors = useThemeColors();

	const [actionBtnState, setActionBtnState] = useState(global.btnState);
	const [emptyCategories, setEmptyCategories] = useState<null | boolean>(null);
	const [forceRefresh, setForceRefresh] = useState(false);
	const [forceCountRefresh, setForceCountRefresh] = useState(global.forceCountRefresh);
	
	const [addCategoryModalVisibility, setAddCategoryModalVisibility] = useState(false);
	const [delCategoryModalVisibility, setDelCategoryModalVisibility] = useState(false);
	const [modCategoryModalVisibility, setModCategoryModalVisibility] = useState(false);
	const [categoryActionName, setCategoryActionName] = useState<string|null>(null);

	const styles = basePage(colors);


	//Synchro l'état du bouton d'action à l'arrivée/retour sur page
	useFocusEffect(

		React.useCallback(() => {

			setActionBtnState(global.btnState);

			if (global.forceCountRefresh){
				
				setForceCountRefresh(true);
				global.forceCountRefresh = false;
			}

		}, [])
	
	);


  return (
	

	<SafeAreaView style={styles.container}>

		<RenderNavBar state={actionBtnState} setState={setActionBtnState}/>

		<RenderModCategoryModal 

			visibility={modCategoryModalVisibility} 
			setModalVisibility={setModCategoryModalVisibility} 
			categoryActionName={categoryActionName as string}
			setForceRefresh={setForceRefresh}/>

		<RenderDelCategoryModal

			visibility={delCategoryModalVisibility} 
			setModalVisibility={setDelCategoryModalVisibility} 
			categoryName={categoryActionName as string}
			setForceRefresh={setForceRefresh}/>

		<RenderAddCategoryModal 
			
			visibility={addCategoryModalVisibility}			
			setModalVisibility={setAddCategoryModalVisibility}
			setForceRefresh={setForceRefresh}/>

		<ImageBackground
		
			style={styles.contentContainer}
			source={emptyCategories === true ? require("@/assets/images/boulanger.png") : undefined}
			contentFit='contain'
			imageStyle={{opacity: 0.5}}
			
		>

			<RenderCategories 
				state={actionBtnState} 
				onEmptyChange={setEmptyCategories}
				isEmptyCategories={emptyCategories}
				setAddModalVisibility={setAddCategoryModalVisibility} setDelCategoryModalVisibility={setDelCategoryModalVisibility} 
				setModCategoryModalVisibility={setModCategoryModalVisibility}setCategoryActionName={setCategoryActionName}
				forceRefresh={forceRefresh}
				setForceRefresh={setForceRefresh}
				forceCountRefresh={forceCountRefresh}
				setForceCountRefresh={setForceCountRefresh}/>
			
		</ImageBackground>
		
		<RenderActionBtn state={actionBtnState} setState={setActionBtnState}/>

	</SafeAreaView>

  )
}