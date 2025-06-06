
import { Platform, StatusBar, StyleSheet } from "react-native";

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

		width: 225,
		height: 230,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: colors["contrasts"],
		borderRadius: 12,
		borderWidth: 3,
	},

	categoryCard: {

		width: 225,
		height: 230,
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
		paddingVertical: "3%",
		
		alignItems: "center",

	},

	optionsMenu: {

		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		marginTop: 15,

	},

	modBtn: {

		width: 80,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: '#FF8300',
		borderRadius: 12,
		padding: 8,
		marginRight: 8,
		
	},

	delBtn: {

		width: 80,
		height: 55,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: '#232326',
		borderRadius: 12,
		padding: 8,

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

		width: "50%",
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

		width: "50%",
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

		width: "70%",
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

		width: "50%",
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

		width: "50%",
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

		width: "70%",
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