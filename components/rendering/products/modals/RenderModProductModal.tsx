
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { ThemedNumberInput } from '@/components/ThemedNumberInput';
import { modProductModal } from '@/constants/styles';
import { showErrorToast } from '@/constants/Toasts';
import { RefreshContext } from '@/contexts/HomeRefreshContext';
import dataAcess from '@/services/database/dataAccess';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import RenderUnitBtn from '../RenderUnitBtn';



type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,

}

export default function RenderModProductModal({ visibility, openModal, closeModal }: RenderingProps) {
	
	const colors = useThemeColors();
	const db = useSQLiteContext();
	const {homeDataListRef} = useContext(RefreshContext)!;

	const [product, setProduct] = useState<Product | null>(null);
	const [productName, setProductName] = useState<string | undefined>(undefined);
	const [nbStock, setNbStock] = useState<string | undefined>(undefined);
	const [imageUri, setImageUri] = useState<string | null>(null);

	const units = ["u", "Kg", "g", "L"];
	const [unitSelected, setUnitSelected] = useState<string | undefined>(undefined);
	

	const styles = modProductModal(colors);

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

	useEffect(() => {

		dataAcess.products.readProduct(db, global.activeProductName)
		.then(cat => setProduct(cat))
		.catch((error) => showErrorToast(error.message));

	}, [product, global.activeProductName]);

	
	if (!product) {

		return null;

	}else{
		
		return (
	
			<Modal 

				visible={visibility === "ModProduct"}
				animationType='fade'
				transparent
				onRequestClose={closeModal}
				statusBarTranslucent // important pour Android 11+

				>
				{/*Le pressable est la zone de détection de fermeture et le TouchableWFeed c'est pour empécher la propagation de la zone de détection. C'est comme une "intersection"*/}
				<Pressable style={styles.modal} onPress={closeModal}>

					<TouchableWithoutFeedback>
						<View style={styles.modalContainer}>

							<ThemedText variant='popupTitle' color='titlesVisuals'>Modifications</ThemedText>
							<ThemedText variant='paragraphPopup' color='contrasts'>{global.activeProductName}</ThemedText>
							<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

							{(!("isFooter" in product) && product.image_src && !imageUri) ? 
								
								<Image source={{ uri: product.image_src }} style={styles.image}/>
								
								: imageUri ? <Image source={{ uri: imageUri }} style={styles.image}/>
								: <>
									<Ionicons name="image-outline" size={48} color="#888" />
									<ThemedText style={{textAlign: "center", padding: 10}} variant='paragraphPopup' color='subtitlesParags'>Touchez pour insérer une image</ThemedText>
								</>
							}

							</TouchableOpacity>

							<View style={styles.inputsContainer}>

								<ThemedTextInput
									style={styles.input}
									variant='paragraphPopup'
									placeholder={`Nom actuel: ${!("isFooter" in product) && product.name}`}
									placeholderTextColor={colors["subtitlesParags"]}
									value={productName}
									onChangeText={setProductName}
								/>
								<ThemedNumberInput
									style={styles.input}
									variant='paragraphPopup'
									placeholder={`Stock actuel: ${!("isFooter" in product) && product.stock}${!("isFooter" in product) && product.unit}`}
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

								dataAcess.products.modifyProduct(db, product, productName!, nbStock!, unitSelected!, imageUri)
								.then(() => {
									
									closeModal();
									setImageUri(null);
									setProductName(undefined);
									setNbStock(undefined);
									setUnitSelected(undefined);
									homeDataListRef.current?.fetchDataList();


								})
								.catch((error) => showErrorToast(error.message));

							}}>
								<ThemedText variant='specialElementsPopup' color='background'>Modifier</ThemedText>
							</TouchableOpacity>

						</View>
					</TouchableWithoutFeedback>

				</Pressable>

				<Toast config={toastConfig}/>

			</Modal>
		);
	}

};