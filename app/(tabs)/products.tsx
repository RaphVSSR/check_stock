
import RenderActionBtn from '@/components/rendering/RenderActionBtn';
import RenderNavBar from '@/components/rendering/RenderNavBar';
import RenderProducts from '@/components/rendering/products/RenderProducts';
import RenderAddProductModal from '@/components/rendering/products/modals/RenderAddProductModal';
import RenderAddStockProductModal from '@/components/rendering/products/modals/RenderAddStockProductModal';
import RenderDelProductModal from '@/components/rendering/products/modals/RenderDelProductModal';
import RenderModProductModal from '@/components/rendering/products/modals/RenderModProductModal';
import RenderRemStockProductModal from '@/components/rendering/products/modals/RenderRemStockProductModal';
import { basePage } from '@/constants/styles';
import { useThemeColors } from '@/hooks/useThemeColors';
import global from '@/utils/global';
import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

export default function Products(){

	const colors = useThemeColors();

	const [actionBtnState, setActionBtnState] = useState(global.btnState);
	const [emptyProducts, setEmptyProducts] = useState<boolean | null>(null);
	const [categoryActionId, setCategoryActionId] = useState<string>(global.activeCategoryId);
	const [categoryActionName, setCategoryActionName] = useState<string>(global.activeCategoryName);

	const [forceRefresh, setForceRefresh] = useState<boolean>(false);

	const [addProductModalVisibility, setAddProductModalVisibility] = useState(false);
	const [delProductModalVisibility, setDelProductModalVisibility] = useState(false);
	const [modProductModalVisibility, setModProductModalVisibility] = useState(false);
	const [addStockProductModalVisibility, setAddStockProductModalVisibility] = useState(false);
	const [remStockProductModalVisibility, setRemStockProductModalVisibility] = useState(false);

	const [productActionName, setProductActionName] = useState<string | null>(null);

	const styles = basePage(colors);


	//Synchro l'état du bouton d'action à l'arrivée/retour sur page
	useFocusEffect(

		React.useCallback(() => {

			setActionBtnState(global.btnState);
			setCategoryActionId(global.activeCategoryId);

		}, [])
	
	);


  return (
	

	<SafeAreaView style={styles.container}>

		<RenderNavBar state={actionBtnState} setState={setActionBtnState} title={categoryActionName}/>

		<RenderAddProductModal

			visibility={addProductModalVisibility} 
			setModalVisibility={setAddProductModalVisibility}
			setForceRefresh={setForceRefresh}/>

		<RenderModProductModal 

			visibility={modProductModalVisibility} 
			setModalVisibility={setModProductModalVisibility} 
			productActionName={productActionName as string}
			setForceRefresh={setForceRefresh}/>

		<RenderDelProductModal

			visibility={delProductModalVisibility} 
			setModalVisibility={setDelProductModalVisibility} 
			productName={productActionName as string}
			setForceRefresh={setForceRefresh}/>

		<RenderAddStockProductModal
		
			visibility={addStockProductModalVisibility}
			setModalVisibility={setAddStockProductModalVisibility}
			setForceRefresh={setForceRefresh}
			productActionName={productActionName as string}/>

		<RenderRemStockProductModal
		
			visibility={remStockProductModalVisibility}
			setModalVisibility={setRemStockProductModalVisibility}
			setForceRefresh={setForceRefresh}
			productActionName={productActionName as string}/>


		<ImageBackground
			
			style={styles.contentContainer}
			source={emptyProducts === true ? require("@/assets/images/panier_produits.png") : undefined}
			contentFit='contain'
			imageStyle={{opacity: 0.5}}
			
		>

			<RenderProducts 
				state={actionBtnState} 
				onEmptyChange={setEmptyProducts}
				isEmptyProducts={emptyProducts} 
				setAddModalVisibility={setAddProductModalVisibility} 
				setDelProductModalVisibility={setDelProductModalVisibility} 
				setModProductModalVisibility={setModProductModalVisibility}
				setAddStockProductModalVisibility={setAddStockProductModalVisibility}
				setRemStockProductModalVisibility={setRemStockProductModalVisibility}
				setProductActionName={setProductActionName}
				categoryActionId={categoryActionId!}
				forceRefresh={forceRefresh}
				setForceRefresh={setForceRefresh}/>
			
		</ImageBackground>
		
		<RenderActionBtn state={actionBtnState} setState={setActionBtnState}/>

	</SafeAreaView>

  )
}