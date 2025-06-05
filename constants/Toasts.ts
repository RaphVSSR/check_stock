import Toast from "react-native-toast-message";

export function showErrorToast(errMessage: string, type: string = "bigError"){

	Toast.show({
		type: type,
		text1: 'Erreur',
		text2: errMessage,
		position: 'bottom',
		bottomOffset: 60,
		autoHide: true,
		visibilityTime: 5000
	});

}