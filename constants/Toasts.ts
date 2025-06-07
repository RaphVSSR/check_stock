import { Dimensions } from "react-native";
import { isTablet } from "react-native-device-info";
import Toast from "react-native-toast-message";

const {width, height} = Dimensions.get("window");


export function showErrorToast(errMessage: string, type: string = "bigError"){

	Toast.show({
		type: type,
		text1: 'Erreur',
		text2: errMessage,
		position: 'bottom',
		bottomOffset: isTablet() ? height * 0.05 : height * 0.03,
		autoHide: true,
		visibilityTime: 8000
	});

}