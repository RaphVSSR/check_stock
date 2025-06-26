
import { ThemedText } from '@/components/ThemedText';
import { useThemeColors } from '@/hooks/useThemeColors';
import React from 'react';
import { Dimensions, Modal, Pressable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Toast, { BaseToastProps } from 'react-native-toast-message';
import style from './chooseCateProdCSS';


type RenderingProps = {

	visibility: string | null,
	openModal: (name: ModalName) => void,
	closeModal: () => void,

}

export default function RenderChooseCategoryProductModal({ visibility, openModal, closeModal }: RenderingProps) {
	
	const colors = useThemeColors();

	const styles = style(colors);
	const {width, height} = Dimensions.get("window");

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

			visible={visibility === "ChooseCategoryProduct"}
			animationType='fade'
			transparent
			onRequestClose={closeModal}
			statusBarTranslucent // important pour Android 11+
			
		>
			{/*Le pressable est la zone de détection de fermeture et le TouchableWFeed c'est pour empécher la propagation de la zone de détection. C'est comme une "intersection"*/}
			<Pressable style={styles.modal} onPress={closeModal}>

				<TouchableWithoutFeedback>
					<View style={styles.modalContainer}>

						<TouchableOpacity style={styles.card} onPress={() => openModal('AddCategory')}>

							<MaterialIcons style={styles.cardIcon} name="category" size={100} color={colors["contrasts"]} />
							<ThemedText style={styles.cardText} variant='cardTitle' color='titlesVisuals'>Nouvelle categorie</ThemedText>

						</TouchableOpacity>
						
						<TouchableOpacity style={styles.card} onPress={() => openModal("AddProduct")}>
							
							<MaterialIcons style={styles.cardIcon} name="article" size={100} color={colors["contrasts"]} />
							<ThemedText style={styles.cardText} variant='cardTitle' color='titlesVisuals'>Nouveau produit</ThemedText>

						</TouchableOpacity>

					</View>
				</TouchableWithoutFeedback>

			</Pressable>

			<Toast config={toastConfig}/>

		</Modal>
	);
};