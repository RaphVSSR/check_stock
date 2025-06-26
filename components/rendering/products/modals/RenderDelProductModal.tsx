
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useContext } from 'react';
import { Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { delProductModal } from '@/constants/styles';
import { RefreshContext } from '@/contexts/HomeRefreshContext';
import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';

type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,
}

export default function RenderDelProductModal({ visibility, openModal, closeModal }: RenderingProps) {
	
	const colors = useThemeColors();
	const db = useSQLiteContext();
	
	const {homeDataListRef} = useContext(RefreshContext)!;

	const styles = delProductModal(colors);

	return (

		<Modal 

			visible={visibility === "DelProduct"}
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
							
							Voulez-vous vraiment supprimer le produit &quot;<ThemedText variant='popupTitle' color='contrasts'>{global.activeProductName}</ThemedText>&quot; ?
						
						</ThemedText>

						<TouchableOpacity style={styles.delButton} onPress={async () => {

							dataAcess.products.deleteProduct(db, global.activeProductName)
							.then(() => {
								
								closeModal();
								homeDataListRef.current?.fetchDataList();
							});

						}}>
							<ThemedText variant='specialElementsPopup' color='background'>Supprimer</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

		</Modal>
	);
};