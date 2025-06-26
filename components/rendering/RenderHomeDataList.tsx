import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { BackHandler, Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

import { useModal } from '@/contexts/ModalsContext';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import DeviceInfo from 'react-native-device-info';
import stylesFile from './categories/categoriesCSS';


type RenderingProps = {

	actionBtnState: boolean,
	homeDataItems: (Category | Product | footerItem)[] | null,
	historyListCategories: {id: number, name: string}[],
	setHistoryListCategories: React.Dispatch<React.SetStateAction<{id: number, name: string}[]>>,
	fetchDataList: () => void,
	listIsRefreshing: boolean,
}


export default function RenderHomeDataList( {actionBtnState, homeDataItems, historyListCategories, setHistoryListCategories, fetchDataList, listIsRefreshing }: RenderingProps){

	const colors = useThemeColors();


	const { width, height } = Dimensions.get("window");
	const isTablet = DeviceInfo.isTablet();

	const { openModal, closeModal, visibleModal } = useModal();

	const styles = stylesFile(colors);


	useEffect(() => {

		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {

			if (historyListCategories[historyListCategories.length -1].id === 0){

				return false;

			}else {

				setHistoryListCategories(prevVersion => prevVersion.slice(0, -1));

				return true;
			}

		});

		return () => {

			backHandler.remove();
		
		};
				
	}, [historyListCategories])


	return (

				
		<FlatList
			
			style={styles.contentContainer}
			data={homeDataItems}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({item}) => (

				("isFooter" in item) && homeDataItems?.length === 1 || ( homeDataItems?.length! > 1 && ("isFooter" in item) && actionBtnState) ?

					<TouchableOpacity style={styles.addBtn} onPress={() => {

						if (historyListCategories[historyListCategories.length -1].id !== 0){

							openModal("ChooseCategoryProduct");

						}else{
							openModal("AddCategory");
						}
					}}>

						<Ionicons name="add" size={width * 0.2} color={colors["contrasts"]} />

					</TouchableOpacity>

				: !("isFooter" in item) ?
				
					("stock" in item) ? 

						<View style={styles.categoryCard}>

								<ImageBackground source={item.image_src ? { uri: item.image_src} : undefined} style={styles.imageCate}>

									{!item.image_src && (

										<View style={styles.iconCate}>

											<Ionicons name="image-outline" size={60} color={colors["subtitlesParags"]}/>

										</View>

									)}

									<BlurView intensity={15} tint="dark" style={styles.blurContainer}>
										
										<ThemedText style={{textAlign: "center"}} variant="cardTitle" color="titlesVisuals">{item.name}</ThemedText>

										<ThemedText variant="cardSubtitle" color="titlesVisuals"> {`${item.stock} ${item.unit}`} </ThemedText>

										{actionBtnState ? (

											<View style={styles.optionsMenu}>

												<TouchableOpacity style={styles.modBtn} onPress={() => {

													global.activeProductName = item.name;
													openModal("ModProduct");

												}}>

													<MaterialCommunityIcons name="pencil" size={width * 0.07} color="#fff"/>

												</TouchableOpacity>
												<TouchableOpacity style={styles.delBtn} onPress={() => {

													global.activeProductName = item.name;
													openModal("DelProduct");

												}}>

													<MaterialCommunityIcons name="trash-can-outline" size={width * 0.07} color="#fff"/>

												</TouchableOpacity>

											</View>

										)
										: (

											<View style={styles.optionsMenu}>

												<TouchableOpacity style={styles.addProdBtn} onPress={() => {

													global.activeProductName = item.name;
													openModal("AddStockProduct");

												}}>

													<MaterialCommunityIcons name="plus" size={isTablet ? width * 0.07 : width * 0.09} color={colors["background"]}/>

												</TouchableOpacity>
												<TouchableOpacity style={styles.remProdBtn} onPress={() => {

													global.activeProductName = item.name;
													openModal("RemStockProduct");

												}}>

													<MaterialCommunityIcons name="minus" size={isTablet ? width * 0.07 : width * 0.09} color={colors["background"]}/>

												</TouchableOpacity>

											</View>

										)}

									</BlurView>

								</ImageBackground>
							</View>
					
					: <TouchableOpacity style={styles.categoryCard} onPress={() => {
						
						setHistoryListCategories(prevVersion => [...prevVersion, {id: item.id, name: item.name}]);
						
					}}>

						<ImageBackground source={item.image_src ? { uri: item.image_src} : undefined} style={styles.imageCate}>

							{!item.image_src && (

								<View style={styles.iconCate}>

									<Ionicons name="image-outline" size={width * 0.12} color={colors["subtitlesParags"]}/>

								</View>

							)}

							<BlurView intensity={15} tint="dark" style={styles.blurContainer}>
								
								<ThemedText style={{textAlign: 'center', paddingHorizontal: 10}} variant="cardTitle" color="titlesVisuals">{item.name}</ThemedText>

								{/*<CategoryStock db={db} categoryName={item.name} forceCountRefresh={forceCountRefresh} setForceCountRefresh={setForceCountRefresh}/>*/}

								{actionBtnState && (

									<View style={styles.optionsMenu}>

										<TouchableOpacity style={styles.modBtn} onPress={() => {

											global.activeCategoryName = item.name;
											openModal("ModCategory");

										}}>

											<MaterialCommunityIcons name="pencil" size={isTablet ? width * 0.05 : width * 0.07} color="#fff"/>

										</TouchableOpacity>
										<TouchableOpacity style={styles.delBtn} onPress={() => {

											global.activeCategoryName = item.name;
											openModal("DelCategory");

										}}>

											<MaterialCommunityIcons name="trash-can-outline" size={isTablet ? width * 0.05 : width * 0.07} color="#fff"/>

										</TouchableOpacity>

									</View>

								)}
							</BlurView>

						</ImageBackground>
					</TouchableOpacity>
				: <></>
			)}
			numColumns={isTablet ? 3 : 2}
			columnWrapperStyle={{justifyContent: "flex-start"}}
			showsVerticalScrollIndicator={false}
			refreshing={listIsRefreshing}
			onRefresh={fetchDataList}
			initialNumToRender={15}
			windowSize={3}

		/>
	)

}