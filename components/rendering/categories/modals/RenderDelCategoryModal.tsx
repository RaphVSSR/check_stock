
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { delCategoryModal } from '@/constants/styles';
import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';
import { isTablet } from 'react-native-device-info';

type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,
}

export default function RenderDelCategoryModal({ visibility, openModal, closeModal }: RenderingProps) {
	
	const colors = useThemeColors();
	
	const db = useSQLiteContext();

	const styles = delCategoryModal(colors);

	return (

		<Modal 

			visible={visibility === "DelCategory"}
			animationType='fade'
			transparent
			onRequestClose={closeModal}
			statusBarTranslucent // important pour Android 11+
			
		>
			{/*Le pressable est la zone de détection de fermeture et le TouchableWFeed c'est pour empécher la propagation de la zone de détection. C'est comme une "intersection"*/}
			<Pressable style={styles.modal} onPress={closeModal}>

				<TouchableWithoutFeedback>
					<View style={styles.modalContainer}>

						<ThemedText style={{marginBottom: "5%", textAlign: "center"}} variant='popupTitle' color='titlesVisuals'>
							
							Voulez-vous vraiment supprimer la catégorie {!isTablet() && "\n"}&quot;<ThemedText  variant='popupTitle' color='contrasts'>{global.activeCategoryName}</ThemedText>&quot; ?
						
						</ThemedText>
						<TouchableOpacity style={styles.delButton} onPress={async () => {

							dataAcess.categories.deleteCategory(db, global.activeCategoryName)
							.then(() => {
								
								closeModal();
								global.forceRefresh = true;
								
							});

						}}>
							<ThemedText variant='specialElementsPopup' color='background' >Supprimer</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

		</Modal>
	);
};