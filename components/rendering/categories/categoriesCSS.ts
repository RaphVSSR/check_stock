import { Dimensions, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";

const isTablet = DeviceInfo.isTablet();
const {width, height} = Dimensions.get("window");

export default (colors: any) => StyleSheet.create({

	contentContainer: {

		flex: 1,
		marginTop: "2%",
		marginBottom: "5%",

	},

	addBtn: {

		width: isTablet ? width * 0.28 : width * 0.43,
		height: height * 0.2,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: colors["contrasts"],
		borderRadius: 12,
		borderWidth: 3,
	},

	categoryCard: {

		width: isTablet ? width * 0.28 : width * 0.43,
		height: height * 0.2,
		backgroundColor: colors["background3"],
		borderRadius: 20,
		marginRight: "3%",
		marginBottom: 20,
		overflow: "hidden",

	},

	imageCate: {

		flex: 1,
		width: "100%",
		height: "100%",
		justifyContent: "flex-end",

	},

	iconCate: {

		flex: 1,
		width: "100%",
		height: "100%",
		paddingTop: "5%",
		alignItems: "center",
		justifyContent: "center",
	},

	blurContainer: {

		width: "100%",
		paddingVertical: isTablet ? "3%" : "5%",
		alignItems: "center",

	},

	optionsMenu: {
		
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		marginTop: 5,

	},

	modBtn: {

		width: isTablet ? width * 0.12  : width * 0.15,
		height: isTablet ? "auto" : height * 0.06,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: '#FF8300',
		borderRadius: 12,
		padding: 8,
		
	},

	delBtn: {

		width: isTablet ? width * 0.12  : width * 0.15,
		height: isTablet ? "auto" : height * 0.06,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: '#232326',
		borderRadius: 12,
		padding: 8,

	},

	addProdBtn: {

		width: isTablet ? width * 0.12 : width * 0.15,
		height: isTablet ? height * 0.06 : height * 0.04,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors["contrasts"],
		borderRadius: 12,
		paddingVertical: isTablet ? "2%" : 0,

	},

	remProdBtn: {

		width: isTablet ? width * 0.12 : width * 0.15,
		height: isTablet ? height * 0.06 : height * 0.04,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors["contrasts"],
		borderRadius: 12,
		paddingVertical: isTablet ? "2%" : 0,

	},

})