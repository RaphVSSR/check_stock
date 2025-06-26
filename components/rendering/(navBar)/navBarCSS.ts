import { StyleSheet } from "react-native";


export default (colors: any, state: boolean) =>  StyleSheet.create({

	header: {

		flexDirection: 'row',
		width: "100%",
		alignItems: 'center',
		paddingVertical: "2%",
		paddingHorizontal: "5%",
		backgroundColor: state ? colors["contrasts"] : colors["background"]
	},

	headerLeft: {

		flexDirection: 'row',
		flex: 1/2,
		marginRight: 8,
		alignItems: "center",
	},
	
	searchInput: {

		minWidth: 150,
		height: 30,
		fontSize: 23,
		paddingTop: 0,
		paddingBottom: 0,
		textAlignVertical: "bottom",
		color: state ? colors["background"] : colors["titlesVisuals"],
		borderBottomColor: state ? colors["background"] : colors["titlesVisuals"],
		borderBottomWidth: 1,
	},
	
	headerRight: {

		flex: 1/2,
		alignItems: "flex-end",
	},

})