
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { ThemedNumberInput } from '@/components/ThemedNumberInput';
import { addProductModal } from '@/constants/styles';
import { showErrorToast } from '@/constants/Toasts';
import dataAcess from '@/services/database/dataAccess';
import global from "@/utils/global";
import { useSQLiteContext } from 'expo-sqlite';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import RenderUnitBtn from '../RenderUnitBtn';

type RenderingProps = {

	visibility: boolean,
	setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function RenderAddProductModal({ visibility, setModalVisibility, setForceRefresh }: RenderingProps) {
	
	const colors = useThemeColors();
	const [productName, setProductName] = useState<string | undefined>(undefined);
	const [nbStock, setNbStock] = useState<string | undefined>(undefined);
	const [imageUri, setImageUri] = useState<string | null>(null);

	const units = ["u", "Kg", "g", "L"];
	const [unitSelected, setUnitSelected] = useState<string>(units[0]);
	
	const db = useSQLiteContext();

	const styles = addProductModal(colors);

	const { width, height } = Dimensions.get("window");

	const toastConfig = {

		bigError: ({ text1, text2, ...rest }: BaseToastProps) => (
		  <View
			style={{
			  minHeight: 100,
			  width: '95%',
			  backgroundColor: colors["background2"],
			  borderRadius: 20,
			  justifyContent: 'flex-start',
			  padding: 20,
			  paddingLeft: 30,
			  borderLeftColor: "red",
			  borderLeftWidth: 10,
			}}
		  >
			<ThemedText variant='paragraphPopup' color='titlesVisuals'>
			  {text1}
			</ThemedText>
			{text2 ? (
			  <ThemedText variant='cardSubtitle' color='titlesVisuals'>
				{text2}
			  </ThemedText>
			) : null}
		  </View>
		),
	  };

	const pickImage = async () => {

		const result = await ImagePicker.launchImageLibraryAsync();
		if (!result.canceled && result.assets && result.assets.length > 0) setImageUri(result.assets[0].uri);

	};

	return (

		<Modal 

			visible={visibility}
			animationType='fade'
			transparent
			onRequestClose={() => setModalVisibility(false)}
			statusBarTranslucent // important pour Android 11+
			
		>
			{/*Le pressable est la zone de détection de fermeture et le TouchableWFeed c'est pour empécher la propagation de la zone de détection. C'est comme une "intersection"*/}
			<Pressable style={styles.modal} onPress={() => setModalVisibility(false)}>

				<TouchableWithoutFeedback>
					<View style={styles.modalContainer}>

						<ThemedText variant='popupTitle' color='titlesVisuals'>Ajouter un produit</ThemedText>
						<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

							{imageUri ? 
		
								<Image source={{ uri: imageUri }} style={styles.image} />
								: 
								<>
									<Ionicons name="image-outline" size={width * 0.12} color="#888" />
									<ThemedText style={{textAlign: "center", padding: 10}} variant='paragraphPopup' color='subtitlesParags'>Touchez pour insérer une image</ThemedText>
								</>
							}

						</TouchableOpacity>

						<View style={styles.inputsContainer}>

							<ThemedTextInput
								style={styles.input}
								variant='paragraphPopup'
								placeholder="Nom du produit"
								placeholderTextColor={colors["subtitlesParags"]}
								value={productName}
								onChangeText={setProductName}
							/>
							<ThemedNumberInput
								style={styles.input}
								variant='paragraphPopup'
								placeholder="Nombre en stock"
								placeholderTextColor={colors["subtitlesParags"]}
								value={nbStock}
								onChangeText={setNbStock}
							/>

						</View>
						<FlatList
							data={units}
							keyExtractor={(item, index) => index.toString()}
							horizontal
							renderItem={({ item }) => (

								<RenderUnitBtn
									unitName={item}
									state={unitSelected === item}
									onPress={() => {

										setUnitSelected(item);

									}}
								/>

							)}
							extraData={unitSelected}
							contentContainerStyle={styles.unitContainer}
						/>

						<TouchableOpacity style={styles.addButton} onPress={async () => {

							dataAcess.products.addProduct(db, productName!, nbStock, unitSelected, imageUri)
							.then(() => {
								
								setModalVisibility(false);
								setImageUri(null);
								setProductName(undefined);
								setNbStock(undefined);
								
								global.forceCountRefresh = true;
								setForceRefresh(true);

							})
							.catch((error) => showErrorToast(error.message));

						}}>
							<ThemedText variant='specialElementsPopup' color='background'>Ajouter</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

			<Toast config={toastConfig}/>

		</Modal>
	);
};