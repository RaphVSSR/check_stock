
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { delCategoryModal } from '@/constants/styles';
import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';

type RenderingProps = {

	visibility: boolean,
	setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	categoryName: string,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function RenderDelCategoryModal({ visibility, setModalVisibility, categoryName, setForceRefresh }: RenderingProps) {
	
	const colors = useThemeColors();
	
	const db = useSQLiteContext();

	const styles = delCategoryModal(colors);

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

						<ThemedText style={{marginBottom: "5%", textAlign: "center"}} variant='popupTitle' color='titlesVisuals'>
							
							Voulez-vous vraiment supprimer la catégorie &quot;<ThemedText  variant='popupTitle' color='contrasts'>{categoryName}</ThemedText>&quot; ?
						
						</ThemedText>
						<TouchableOpacity style={styles.delButton} onPress={async () => {

							dataAcess.categories.deleteCategory(db, categoryName)
							.then(() => {
								
								setModalVisibility(false)
								setForceRefresh(true);
								
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