
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';

type RenderingProps = {

	visibility: boolean,
	setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	categoryName: string,
}

export default function RenderDelCategoryModal({ visibility, setModalVisibility, categoryName }: RenderingProps) {
	
	const colors = useThemeColors();
	
	const db = useSQLiteContext();

	const styles = StyleSheet.create({
		
		modal: {

			flex: 1,
			backgroundColor: colors["backgroundPopup"],
			alignItems: "center",
			justifyContent: "center",

		},

		modalContainer: {

			width: "70%",
			padding: 30,
			alignItems: "center",
			backgroundColor: colors["background2"],
			borderRadius: 26

		},

		delButton: {
			width: '100%',
			paddingVertical: 12,
			alignItems: 'center',
			backgroundColor: colors["contrasts"],
			borderRadius: 20,
		},
	});

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

						<ThemedText style={{marginBottom: "5%", textAlign: "center"}} variant='popupTitle' color='titlesVisuals'>Voulez-vous vraiment supprimer la catégorie
						&quot;{categoryName}&quot; ?</ThemedText>
						<TouchableOpacity style={styles.delButton} onPress={async () => {

							dataAcess.categories.deleteCategory(db, categoryName)
							.then(() => setModalVisibility(false));

						}}>
							<ThemedText variant='specialElementsPopup' color='background' >Supprimer</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

		</Modal>
	);
};