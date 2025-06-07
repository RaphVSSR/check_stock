

import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { ThemedNumberInput } from '@/components/ThemedNumberInput';
import { setStockProductModal } from '@/constants/styles';
import { showErrorToast } from '@/constants/Toasts';
import dataAcess from '@/services/database/dataAccess';
import { useSQLiteContext } from 'expo-sqlite';
import Toast, { BaseToastProps } from 'react-native-toast-message';

type RenderingProps = {

	visibility: boolean,
	setModalVisibility: React.Dispatch<React.SetStateAction<boolean>>,
	setForceRefresh: React.Dispatch<React.SetStateAction<boolean>>,
	productActionName: string,

}

export default function RenderAddStockProductModal({ visibility, setModalVisibility, setForceRefresh, productActionName }: RenderingProps) {
	
	const colors = useThemeColors();
	
	const [nbAddStock, setNbAddStock] = useState<number>(0);
	
	const db = useSQLiteContext();

	const styles = setStockProductModal(colors);

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

						<ThemedText style={{marginRight: 10}} variant='popupTitle' color='titlesVisuals'>Ajout <ThemedText variant='popupTitle' color='contrasts'>{productActionName}</ThemedText></ThemedText>

						<View style={styles.inputContainer}>

							<TouchableOpacity style={styles.interactProdBtn} onPress={() => {

								if(nbAddStock !== 0){
									
									setNbAddStock(nbAddStock-1)
									
								}else;

							}}>

								<MaterialCommunityIcons name="chevron-left" size={60} color={colors["titlesVisuals"]}/>

							</TouchableOpacity>


							<ThemedNumberInput
							
								style={styles.input}
								variant='paragraphPopup'
								placeholderTextColor={colors["subtitlesParags"]}
								value={nbAddStock.toString()}
								onChangeText={text => setNbAddStock(Number(text))}
							/>

							<TouchableOpacity style={styles.interactProdBtn} onPress={() => {

								setNbAddStock(nbAddStock+1);

							}}>

								<MaterialCommunityIcons name="chevron-right" size={60} color={colors["titlesVisuals"]}/>

							</TouchableOpacity>

						</View>


						<TouchableOpacity style={styles.submitButton} onPress={async () => {

							dataAcess.products.addStockProduct(db, nbAddStock, productActionName)
							.then(() => {
								
								setModalVisibility(false);
								setForceRefresh(true);

							})
							.catch((error) => showErrorToast(error.message));

						}}>
							<ThemedText variant='specialElementsPopup' color='background' >Confirmer</ThemedText>
						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

			<Toast config={toastConfig}/>

		</Modal>
	);
};