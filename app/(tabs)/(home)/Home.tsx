import RenderNavBar from '@/components/rendering/(navBar)/RenderNavBar';
import RenderActionBtn from '@/components/rendering/RenderActionBtn';
import RenderHomeDataList from '@/components/rendering/RenderHomeDataList';
import { RefreshContext } from '@/contexts/HomeRefreshContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import dataAccess from '@/services/database/dataAccess';
import { ImageBackground } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { SafeAreaView } from 'react-native';
import stylesFile from './homeCSS';

global.btnState = false;
global.activeCategoryName = "";
global.activeProductName = "";
global.forceStockRefresh = false;

export type homeDataListRef = {

	fetchDataList: () => void;

}

export default forwardRef( function Home(){

	const colors = useThemeColors();
	const db = useSQLiteContext();

	const [actionBtnState, setActionBtnState] = useState(global.btnState);
	const [homeDataItems, setHomeDataItems] = useState<(Category | footerItem)[] | null>(null);

	const {historyListCategories, setHistoryListCategories, homeDataListRef} = useContext(RefreshContext)!;
	const [listIsRefreshing, setListIsRefreshing] = useState<boolean>(false);

	const styles = stylesFile(colors);

	const fetchDataList = useCallback(async () => {

		setListIsRefreshing(true);

		try {

			const rawCategories = await dataAccess.items.readItemsFromParent(db, historyListCategories[historyListCategories.length -1].id);

			//Format list array before rendering
			const categoriesAssambled = rawCategories && rawCategories.length > 0
				? [...rawCategories, { isFooter: true }]
				: [{ isFooter: true }];

			setHomeDataItems(categoriesAssambled);

		} catch (error) {

			console.error(error);

		} finally {

			setListIsRefreshing(false);

		}
		
	}, [historyListCategories]);

	

	useEffect(() => {

		try {
			
			fetchDataList();
	
		} catch (error: any){
			
			throw new Error(`Problèmes pour récupérer les données : ${error.message}`);
			
		}	

	}, [historyListCategories])


	useFocusEffect(

		useCallback(() => {

			setActionBtnState(global.btnState);

		}, [])
	
	);

	useImperativeHandle(homeDataListRef, () => ({

		fetchDataList,

	}));

  return (
	

	<SafeAreaView style={styles.container}>

		<RenderNavBar state={actionBtnState} setState={setActionBtnState}/>

		<ImageBackground
		
			style={styles.contentContainer}
			source={homeDataItems?.length === 1 ? require("@/assets/images/boulanger.png") : undefined}
			contentFit='contain'
			imageStyle={{opacity: 0.5}}
			
		>

			<RenderHomeDataList
				actionBtnState={actionBtnState}
				homeDataItems={homeDataItems}
				historyListCategories={historyListCategories}
				setHistoryListCategories={setHistoryListCategories}
				fetchDataList={fetchDataList}
				listIsRefreshing={listIsRefreshing}/>
			
		</ImageBackground>
		
		<RenderActionBtn state={actionBtnState} setState={setActionBtnState}/>

	</SafeAreaView>

  )
})