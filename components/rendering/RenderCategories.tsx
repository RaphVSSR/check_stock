import { useThemeColors } from "@/hooks/useThemeColors"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native"
import { ThemedText } from "../ThemedText"

type RenderingProps = {

	state: boolean,
	onEmptyChange: React.Dispatch<React.SetStateAction<boolean>>,
	setAddModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}

type categoriesProps = {

	name?: string,
	infos?: string,
	isFooter?: boolean,

}

const categoriesDefault: categoriesProps[] = [


	{name: "categorie 0", infos: "Nb références"},
	{isFooter: true}

]


export default function RenderCategories({state, onEmptyChange, setAddModalVisibility}: RenderingProps){

	const router = useRouter();
	const colors = useThemeColors();

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
			paddingBottom: "3%",
			backgroundColor: colors["background3"],
			borderRadius: 20,
			justifyContent: "flex-end",
			alignItems: "center",
			marginRight: "3%",
			marginBottom: 20,

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

	const [categories, setCategories] = useState(categoriesDefault)

	useEffect(() => {

		onEmptyChange(categories.length <= 1);

	}, [categories, onEmptyChange])


	return (

		<FlatList
			
			style={styles.contentContainer}
			data={categories}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({item}) => (

				(item.isFooter && (categories.length === 1)) || (item.isFooter && ((categories.length > 1) && state)) ?

					<TouchableOpacity style={styles.addBtn} onPress={() => {setAddModalVisibility(true)}}>

						<Ionicons name="add" size={100} color={colors["contrasts"]} />

					</TouchableOpacity>

				: !item.isFooter ?
				
					<TouchableOpacity style={styles.categoryCard} onPress={() => {router.push("/products")}}>

						<ThemedText variant="cardTitle" color="titlesVisuals">{item.name}</ThemedText>
						<ThemedText variant="cardSubtitle" color="titlesVisuals">{item.infos}</ThemedText>

						{state && (

							<View style={styles.optionsMenu}>

								<TouchableOpacity style={styles.modBtn}>

									<MaterialCommunityIcons name="pencil" size={35} color="#fff"/>

								</TouchableOpacity>
								<TouchableOpacity style={styles.delBtn}>

									<MaterialCommunityIcons name="trash-can-outline" size={35} color="#fff"/>

								</TouchableOpacity>

							</View>

						)}

					</TouchableOpacity>
				: <></>
			)}
			numColumns={3}
			columnWrapperStyle={{justifyContent: "flex-start"}}
			showsVerticalScrollIndicator={false}

		/>

	)

}