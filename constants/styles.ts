
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get("window");

const isTablet = DeviceInfo.isTablet();

export const basePage = (colors: any) => StyleSheet.create({

	container: {

		flex: 1,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, //Force l'espace avec les barres d'informatioins de l'appareil
	
		backgroundColor: colors["background"],
	},

	contentContainer: {

		flex: 1,
		paddingHorizontal: "5%",
		paddingTop: "2%",
		backgroundColor: colors["background2"],

	},

})

export const displayListStyles = (colors: any) => StyleSheet.create({

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


export const addCategoryModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
		padding: 30,
		alignItems: "center",
		backgroundColor: colors["background2"],
		borderRadius: 26

	},

	imagePicker: {

		width: "100%",
		height: 200,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors["background3"],
	},

	image: {

		flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 16,
	},

	imageText: {
		color: '#aaa',
		marginTop: 8,
		fontSize: 15,
	},

	input: {
		width: '100%',
		color: colors["titlesVisuals"],
		marginVertical: 40,
		borderBottomWidth: 2,
		borderBottomColor: colors["titlesVisuals"],
	},

	addButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: colors["contrasts"],
		borderRadius: 20,
	},
});

export const modCategoryModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
		padding: 30,
		alignItems: "center",
		backgroundColor: colors["background2"],
		borderRadius: 26

	},

	imagePicker: {

		width: "100%",
		height: 200,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors["background3"],
	},

	image: {

		flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 16,
	},

	imageText: {
		color: '#aaa',
		marginTop: 8,
		fontSize: 15,
	},

	input: {
		width: '100%',
		color: colors["titlesVisuals"],
		marginVertical: 40,
		borderBottomWidth: 2,
		borderBottomColor: colors["titlesVisuals"],
	},

	addButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: colors["contrasts"],
		borderRadius: 20,
	},
});

export const delCategoryModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
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


export const addProductModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
		padding: 30,
		alignItems: "center",
		backgroundColor: colors["background2"],
		borderRadius: 26

	},

	imagePicker: {

		width: "100%",
		height: 200,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors["background3"],
	},

	image: {

		flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 16,
	},

	imageText: {
		color: '#aaa',
		marginTop: 8,
		fontSize: 15,
	},

	inputsContainer: {

		width: "100%",
		marginTop: 20,
		marginBottom: 40,
		rowGap: 30,

	},

	input: {
		width: '100%',
		color: colors["titlesVisuals"],
		borderBottomWidth: 2,
		borderBottomColor: colors["titlesVisuals"],
	},

	unitContainer: {

		flexDirection: "row",
		width: "100%",
		paddingVertical: "2%",
		paddingHorizontal: "3%",
		justifyContent: "space-between",
		marginBottom: 30,

	},

	addButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: colors["contrasts"],
		borderRadius: 20,
	},
});

export const modProductModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
		padding: 30,
		alignItems: "center",
		backgroundColor: colors["background2"],
		borderRadius: 26

	},

	imagePicker: {

		width: "100%",
		height: 200,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors["background3"],
	},

	image: {

		flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 16,
	},

	imageText: {
		color: '#aaa',
		marginTop: 8,
		fontSize: 15,
	},

	inputsContainer: {

		width: "100%",
		marginTop: 20,
		marginBottom: 40,
		rowGap: 30,

	},

	input: {
		width: '100%',
		color: colors["titlesVisuals"],
		borderBottomWidth: 2,
		borderBottomColor: colors["titlesVisuals"],
	},

	unitContainer: {

		flexDirection: "row",
		width: "100%",
		paddingVertical: "2%",
		paddingHorizontal: "3%",
		justifyContent: "space-between",
		marginBottom: 30,

	},

	addButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: colors["contrasts"],
		borderRadius: 20,
	},
});

export const delProductModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
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

export const setStockProductModal = (colors: any) => StyleSheet.create({
		
	modal: {

		flex: 1,
		backgroundColor: colors["backgroundPopup"],
		alignItems: "center",
		justifyContent: "center",

	},

	modalContainer: {

		width: isTablet ? "70%" : "80%",
		padding: 30,
		alignItems: "center",
		backgroundColor: colors["background2"],
		borderRadius: 26

	},

	imagePicker: {

		width: "100%",
		height: 200,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors["background3"],
	},

	image: {

		flex: 1,
		width: "100%",
		height: "100%",
		borderRadius: 16,
	},

	imageText: {
		marginTop: 8,
		fontSize: 15,
	},

	inputsContainer: {

		width: "100%",
		marginTop: 20,
		marginBottom: 40,
		rowGap: 30,

	},

	inputContainer: {

		flexDirection: "row",
		width: "100%",
		paddingVertical: "2%",
		paddingHorizontal: "3%",
		justifyContent: "space-between",
		marginVertical: 30,

	},

	input: {
		fontSize: 55,
		color: colors["titlesVisuals"],
	},

	interactProdBtn: {
		padding: width * 0.02,
		alignItems: 'center',
		justifyContent: "center",
		backgroundColor: colors["background"],
		borderRadius: 20,
	},

	submitButton: {
		width: '100%',
		paddingVertical: 12,
		alignItems: 'center',
		backgroundColor: colors["contrasts"],
		borderRadius: 20,
	},
});


export const unitBtn = (colors: any) => StyleSheet.create({

	unitBtn: {

		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: colors["background3"],
		borderRadius: 9999,

	},

	unitBtnActivated: {

		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: colors["contrasts"],
		borderRadius: 9999,

	}

})