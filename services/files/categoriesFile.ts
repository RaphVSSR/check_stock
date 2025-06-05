
import * as FileSystem from 'expo-file-system';

export async function saveCategoryImage(imageUri: string, categoryName: string) {

	try {

		const match = /\.(\w+)$/.exec(imageUri);
		
		const format = match ? match[1] : 'jpg';
		
		const dirUri = FileSystem.documentDirectory + 'images/categories/';
		await FileSystem.makeDirectoryAsync(dirUri, { intermediates: true });
	
		let formatedCategoryName = categoryName;

		if (categoryName.includes(" ")) formatedCategoryName = categoryName.split(" ").join("_");
		
		const fileName = `${formatedCategoryName}_${Date.now()}.${format}`;
		const destUri = dirUri + fileName;

		await FileSystem.copyAsync({

			from: imageUri,
			to: destUri,
			
		});
	
		return destUri;


	} catch (error) {
		
		console.error('Erreur lors de la sauvegarde de l\'image :', error);
    	return null;

	}

}

export async function deleteCategoryImage(imgUri: string) {

	try {

		const info = await FileSystem.getInfoAsync(imgUri);

		if (info.exists){

			await FileSystem.deleteAsync(imgUri, {idempotent: true})

		}else{

			throw new Error("Erreur lors de la suppression de l\'image.");
		}

	} catch (error: any) {
		
		console.error(error.message);
		throw error;

	}

}