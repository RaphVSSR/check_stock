import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../ThemedText";

import { displayListStyles } from '@/constants/styles';
import { Product } from "@/constants/types";
import dataAccess from '@/services/database/dataAccess';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { isTablet } from "react-native-device-info";


type RenderingProps = {

	state: boolean,
	isEmptyProducts: boolean | null,
	onEmptyChange: React.Dispatch<React.SetStateAction<boolean | null>>,
	setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setDelProductModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setModProductModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setProductActionName: React.Dispatch<React.SetStateAction<string|null>>,
	setAddStockProductModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setRemStockProductModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	categoryActionId: string,
	forceRefresh: boolean,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function RenderProducts({state, isEmptyProducts, onEmptyChange, setAddModalVisibility, setDelProductModalVisibility, setModProductModalVisibility, setProductActionName, setAddStockProductModalVisibility, setRemStockProductModalVisibility, categoryActionId, forceRefresh, setForceRefresh}: RenderingProps){
	
	const colors = useThemeColors();

	const db = useSQLiteContext();

	const styles = displayListStyles(colors);

	const { width, height } = Dimensions.get("window");

	const [products, setProducts] = useState<null | Product[]>(null);
	

	useEffect(() => {

		forceRefresh && setForceRefresh(false);
		
		dataAccess.products.readProducts(db, categoryActionId)
		.then((rawProducts) => {
			
			let productsAssambled = rawProducts && rawProducts.length > 0
				? [...rawProducts, { isFooter: true }]
				: [{ isFooter: true }];
				

			setProducts(productsAssambled);

		})
		.catch((error) => console.error(error));

	}, [categoryActionId, forceRefresh])

	useEffect(() => {

		products && onEmptyChange(("isFooter" in products[0]));

	}, [products])


	return (

		<>
			{typeof isEmptyProducts === "boolean" && (
				
				<FlatList
				
					style={styles.contentContainer}
					data={products}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({item}) => (

						("isFooter" in item) && products!.length === 1 || ( products!.length > 1 && ("isFooter" in item) && state) ?

							<TouchableOpacity style={styles.addBtn} onPress={() => {setAddModalVisibility(true)}}>

								<Ionicons name="add" size={100} color={colors["contrasts"]} />

							</TouchableOpacity>

						: !("isFooter" in item) ?
						
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

										{state ? (

											<View style={styles.optionsMenu}>

												<TouchableOpacity style={styles.modBtn} onPress={() => {

													setProductActionName(item.name);
													setModProductModalVisibility(true);

												}}>

													<MaterialCommunityIcons name="pencil" size={width * 0.07} color="#fff"/>

												</TouchableOpacity>
												<TouchableOpacity style={styles.delBtn} onPress={() => {

													setProductActionName(item.name);
													setDelProductModalVisibility(true);

												}}>

													<MaterialCommunityIcons name="trash-can-outline" size={width * 0.07} color="#fff"/>

												</TouchableOpacity>

											</View>

										)
										: (

											<View style={styles.optionsMenu}>

												<TouchableOpacity style={styles.addProdBtn} onPress={() => {

													setProductActionName(item.name);
													setAddStockProductModalVisibility(true);

												}}>

													<MaterialCommunityIcons name="plus" size={isTablet() ? width * 0.07 : width * 0.09} color={colors["background"]}/>

												</TouchableOpacity>
												<TouchableOpacity style={styles.remProdBtn} onPress={() => {

													setProductActionName(item.name);
													setRemStockProductModalVisibility(true);

												}}>

													<MaterialCommunityIcons name="minus" size={isTablet() ? width * 0.07 : width * 0.09} color={colors["background"]}/>

												</TouchableOpacity>

											</View>

										)}

									</BlurView>

								</ImageBackground>
							</View>
						: <></>
					)}
					numColumns={isTablet() ? 3 : 2}
					columnWrapperStyle={{justifyContent: "flex-start"}}
					showsVerticalScrollIndicator={false}

				/>
			)}
		</>

	)

}