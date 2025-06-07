import { Category } from '@/constants/types';
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../ThemedText";

import { displayListStyles } from '@/constants/styles';
import dataAccess from '@/services/database/dataAccess';
import global from "@/utils/global";
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import DeviceInfo from 'react-native-device-info';


type RenderingProps = {

	state: boolean,
	isEmptyCategories: boolean | null,
	onEmptyChange: React.Dispatch<React.SetStateAction<boolean | null>>,
	setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setDelCategoryModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setModCategoryModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setCategoryActionName: React.Dispatch<React.SetStateAction<string|null>>,
	forceRefresh: boolean,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
	forceCountRefresh: boolean,
	setForceCountRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function RenderCategories({state, isEmptyCategories, onEmptyChange, setAddModalVisibility, setDelCategoryModalVisibility, setModCategoryModalVisibility, setCategoryActionName, forceRefresh, setForceRefresh, forceCountRefresh, setForceCountRefresh}: RenderingProps){

	const router = useRouter();
	const colors = useThemeColors();

	const db = useSQLiteContext();

	const styles = displayListStyles(colors);

	const { width, height } = Dimensions.get("window");

	const isTablet = DeviceInfo.isTablet();

	const [categories, setCategories] = useState<null | Category[]>(null);


	useEffect(() => {
		
		forceRefresh && setForceRefresh(false);
		
		dataAccess.categories.readCategories(db)
		.then((rawCategories) => {
			
			let categoriesAssambled = rawCategories && rawCategories.length > 0
				? [...rawCategories, { isFooter: true }]
				: [{ isFooter: true }];
				
			setCategories(categoriesAssambled);

		})
		.catch((error) => console.error(error));
				
	}, [forceRefresh])

	useEffect(() => {

		categories && onEmptyChange(("isFooter" in categories![0]));


	}, [categories])


	return (

		<>
			{typeof isEmptyCategories === "boolean"	&& (
				
				<FlatList
					
					style={styles.contentContainer}
					data={categories}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({item}) => (

						("isFooter" in item) && categories!.length === 1 || ( categories!.length > 1 && ("isFooter" in item) && state) ?

							<TouchableOpacity style={styles.addBtn} onPress={() => {setAddModalVisibility(true)}}>

								<Ionicons name="add" size={width * 0.2} color={colors["contrasts"]} />

							</TouchableOpacity>

						: !("isFooter" in item) ?
						
							<TouchableOpacity style={styles.categoryCard} onPress={() => {
								
								global.activeCategoryId = item.id.toString();
								global.activeCategoryName = item.name;
								router.push("/products");
								
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

										{state && (

											<View style={styles.optionsMenu}>

												<TouchableOpacity style={styles.modBtn} onPress={() => {

													setCategoryActionName(item.name);
													setModCategoryModalVisibility(true);

												}}>

													<MaterialCommunityIcons name="pencil" size={isTablet ? width * 0.05 : width * 0.07} color="#fff"/>

												</TouchableOpacity>
												<TouchableOpacity style={styles.delBtn} onPress={() => {

													setCategoryActionName(item.name);
													setDelCategoryModalVisibility(true);

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

				/>

			)}
		</>
	)

}