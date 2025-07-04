
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { modCategoryModal } from '@/constants/styles';
import { showErrorToast } from '@/constants/Toasts';
import dataAcess from '@/services/database/dataAccess';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import Toast, { BaseToastProps } from 'react-native-toast-message';


type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,

}

export default function RenderModCategoryModal({ visibility, openModal, closeModal}: RenderingProps) {
	
	const colors = useThemeColors();
	const [category, setCategory] = useState<Category | null>(null);
	const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
	const [imageUri, setImageUri] = useState<string | null>(null);
	
	const db = useSQLiteContext();

	const {width, height} = Dimensions.get("window");
	
	const styles = modCategoryModal(colors);


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

		dataAcess.categories.readCategory(db, global.activeCategoryName)
		.then(cat => setCategory(cat))
		.catch((error) => showErrorToast(error.message));

	}, [category, global.activeCategoryName]);

	if (!category) {
		return null;
	}else{
		
		return (
	
			<Modal 
	
				visible={visibility === "ModCategory"}
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
							<ThemedText variant='paragraphPopup' color='contrasts'>{global.activeCategoryName}</ThemedText>
							<TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

								{(!("isFooter" in category) && category.image_src && !imageUri) ? 
								
								<Image source={{ uri: category.image_src }} style={styles.image}/>
								
								: imageUri ? <Image source={{ uri: imageUri }} style={styles.image}/>
								:<>
									<Ionicons name="image-outline" size={width * 0.12} color="#888" />
									<ThemedText style={{textAlign: "center", padding: 10}} variant='paragraphPopup' color='subtitlesParags'>Touchez pour insérer une image</ThemedText>
								</>}

							</TouchableOpacity>
							<ThemedTextInput
								style={styles.input}
								variant='paragraphPopup'
								placeholder={!("isFooter" in category) ? "Actual: " + category.name : ""}
								placeholderTextColor={colors["subtitlesParags"]}
								value={categoryName}
								onChangeText={setCategoryName}
							/>
							<TouchableOpacity style={styles.addButton} onPress={async () => {

								dataAcess.categories.modifyCategory(db, category, categoryName!, imageUri)
								.then(() => {
									
									closeModal();
									setCategoryName(undefined);
									setImageUri(null);
									setCategory(null);
									global.forceRefresh = true;
								
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