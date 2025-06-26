
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";
import DeviceInfo from 'react-native-device-info';

const {width, height} = Dimensions.get("window");

const isTablet = DeviceInfo.isTablet();


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