import { Dimensions, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";

const {width, height} = Dimensions.get("window");

const isTablet = DeviceInfo.isTablet();

export default (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		flexDirection: "row",
		width: "100%",
		paddingHorizontal: isTablet ? "10%" : "5%",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 26

	},

	card:{

		flexDirection: "column",
		width: isTablet ? "45%" : "48%",
		height: isTablet ? "68%" : "68%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 15,
		backgroundColor: colors["background2"],
	},

	cardIcon: {

		paddingHorizontal: "10%",
		marginTop: "20%",
		marginBottom: "15%",
	},

	cardText: {

		paddingHorizontal: "10%",
		textAlign: "center",
	}

});