import { Category } from '@/constants/types';
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";

import dataAccess from '@/services/database/dataAccess';
import { BlurView } from 'expo-blur';
import { ImageBackground } from 'expo-image';
import { CategoryStock } from '../CategoryStock';


type RenderingProps = {

	state: boolean,
	onEmptyChange: React.Dispatch<React.SetStateAction<boolean>>,
	setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setDelCategoryModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setModCategoryModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setCategoryActionName: React.Dispatch<React.SetStateAction<string|null>>,
}


export default function RenderCategories({state, onEmptyChange, setAddModalVisibility, setDelCategoryModalVisibility, setModCategoryModalVisibility, setCategoryActionName}: RenderingProps){

	const router = useRouter();
	const colors = useThemeColors();

	const db = useSQLiteContext();

	const styles = StyleSheet.create({

		contentContainer: {

			flex: 1,
			marginTop: "2%",
			marginBottom: "5%",

		},
	
		addBtn: {
	
			width: 225,
			height: 230,
			alignItems: 'center',
			justifyContent: 'center',
			borderColor: colors["contrasts"],
			borderRadius: 12,
			borderWidth: 3,
		},

		categoryCard: {

			width: 225,
			height: 230,
			backgroundColor: colors["background3"],
			borderRadius: 20,
			marginRight: "3%",
			marginBottom: 20,
			overflow: "hidden",

		},

		imageCate: {

			flex: 1,
			width: "100%",
			height: "100%",
			justifyContent: "flex-end",

		},

		iconCate: {

			flex: 1,
			width: "100%",
			height: "100%",
			paddingTop: "5%",
			alignItems: "center",
			justifyContent: "center",
		},

		blurContainer: {

			width: "100%",
			paddingVertical: "3%",
			
			alignItems: "center",

		},

		optionsMenu: {

			flexDirection: "row",
			width: "100%",
			justifyContent: "space-evenly",
			marginTop: 15,

		},

		modBtn: {

			width: 80,
			height: 55,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: '#FF8300',
			borderRadius: 12,
			padding: 8,
			marginRight: 8,
			
		},

		delBtn: {

			width: 80,
			height: 55,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: '#232326',
			borderRadius: 12,
			padding: 8,

		},

	})

	const [categories, setCategories] = useState<null | Category[]>(null);
	//const [forceRefresh, setForceRefresh] = useState(false);


	useEffect(() => {
		
		dataAccess.categories.readCategories(db)
		.then((rawCategories) => {
			
			let categoriesAssambled = rawCategories && rawCategories.length > 0
				? [...rawCategories, { isFooter: true }]
				: [{ isFooter: true }];
				
			
			setCategories(categoriesAssambled);

		})
		.catch((error) => console.error(error));

		onEmptyChange(!!categories ? categories!.length<=1 : true);

	}, [db, categories, onEmptyChange])


	return (

		<FlatList
			
			style={styles.contentContainer}
			data={categories}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({item}) => (

				("isFooter" in item) && categories!.length === 1 || ( categories!.length > 1 && ("isFooter" in item) && state) ?

					<TouchableOpacity style={styles.addBtn} onPress={() => {setAddModalVisibility(true)}}>

						<Ionicons name="add" size={100} color={colors["contrasts"]} />

					</TouchableOpacity>

				: !("isFooter" in item) ?
				
					<TouchableOpacity style={styles.categoryCard} onPress={() => {router.push("/products")}}>

						<ImageBackground source={item.image_src ? { uri: item.image_src} : undefined} style={styles.imageCate}>

							{!item.image_src && (

								<View style={styles.iconCate}>

									<Ionicons name="image-outline" size={60} color={colors["subtitlesParags"]}/>

								</View>

							)}

							<BlurView intensity={15} tint="dark" style={styles.blurContainer}>
								
								<ThemedText variant="cardTitle" color="titlesVisuals">{item.name}</ThemedText>

								<CategoryStock db={db} categoryName={item.name}/>

								{state && (

									<View style={styles.optionsMenu}>

										<TouchableOpacity style={styles.modBtn} onPress={() => {

											setCategoryActionName(item.name);
											setModCategoryModalVisibility(true);

										}}>

											<MaterialCommunityIcons name="pencil" size={35} color="#fff"/>

										</TouchableOpacity>
										<TouchableOpacity style={styles.delBtn} onPress={() => {

											setCategoryActionName(item.name);
											setDelCategoryModalVisibility(true);

										}}>

											<MaterialCommunityIcons name="trash-can-outline" size={35} color="#fff"/>

										</TouchableOpacity>

									</View>

								)}
							</BlurView>

						</ImageBackground>
					</TouchableOpacity>
				: <></>
			)}
			numColumns={3}
			columnWrapperStyle={{justifyContent: "flex-start"}}
			showsVerticalScrollIndicator={false}

		/>

	)

}