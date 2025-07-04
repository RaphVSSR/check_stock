
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { addCategoryModal } from '@/constants/styles';
import { showErrorToast } from '@/constants/Toasts';
import { RefreshContext } from '@/contexts/HomeRefreshContext';
import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';
import Toast, { BaseToastProps } from 'react-native-toast-message';


type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,

}

export default function RenderAddCategoryModal({ visibility, openModal, closeModal }: RenderingProps) {
	
	const colors = useThemeColors();
	const [categoryName, setCategoryName] = useState<string | undefined>(undefined);
	const [imageUri, setImageUri] = useState<string | null>(null);
	
	const db = useSQLiteContext();

	const styles = addCategoryModal(colors);
	const {width, height} = Dimensions.get("window");

	const {historyListCategories, setHistoryListCategories, homeDataListRef} = useContext(RefreshContext)!;

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

			visible={visibility === "AddCategory"}
			animationType='fade'
			transparent
			onRequestClose={closeModal}
			statusBarTranslucent // important pour Android 11+
			
		>
			{/*Le pressable est la zone de détection de fermeture et le TouchableWFeed c'est pour empécher la propagation de la zone de détection. C'est comme une "intersection"*/}
			<Pressable style={styles.modal} onPress={closeModal}>

				<TouchableWithoutFeedback>
					<View style={styles.modalContainer}>

						<ThemedText style={{textAlign: 'center'}} variant='popupTitle' color='titlesVisuals'>Ajouter une catégorie</ThemedText>
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
						<ThemedTextInput
							style={styles.input}
							variant='paragraphPopup'
							placeholder="Nom de la catégorie"
							placeholderTextColor={colors["subtitlesParags"]}
							value={categoryName}
							onChangeText={setCategoryName}
						/>
						<TouchableOpacity style={styles.addButton} onPress={async () => {

							dataAcess.categories.addCategory(db, categoryName!, historyListCategories[historyListCategories.length -1].id, imageUri)
							.then(() => {
								
								closeModal();
								setImageUri(null);
								setCategoryName(undefined);
								homeDataListRef.current?.fetchDataList();

							})
							.catch((error) => showErrorToast(error.message));

						}}>
							<ThemedText variant='specialElementsPopup' color='background' >Ajouter</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

			<Toast config={toastConfig}/>

		</Modal>
	);
};