
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { delProductModal } from '@/constants/styles';
import { Product } from '@/constants/types';
import dataAcess from '@/services/database/dataAccess';
import global from "@/utils/global";
import { useSQLiteContext } from 'expo-sqlite';

type RenderingProps = {

	visibility: boolean,
	setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	productName: string,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function RenderDelProductModal({ visibility, setModalVisibility, productName, setForceRefresh }: RenderingProps) {
	
	const colors = useThemeColors();
	
	const db = useSQLiteContext();

	const styles = delProductModal(colors);
	const [sendingProducts, setSendingProducts] = useState<Product[] | null>(null);

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
							
							Voulez-vous vraiment supprimer le produit &quot;<ThemedText variant='popupTitle' color='contrasts'>{productName}</ThemedText>&quot; ?
						
						</ThemedText>

						<TouchableOpacity style={styles.delButton} onPress={async () => {

							dataAcess.products.deleteProduct(db, productName)
							.then(() => {
								
								setModalVisibility(false);

								global.forceCountRefresh = true;
								setForceRefresh(true);
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