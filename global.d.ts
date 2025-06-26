
const modalListName = {

	AddCategory: "AddCategory",
	ModCategory: "ModCategory",
	DelCategory: "DelCategory",
	AddProduct: "AddProduct",
	ModProduct: "ModProduct",
	DelProduct: "DelProduct",
	AddStockProduct: "AddStockProduct",
	RemStockProduct: "RemStockProduct",
	ChooseCategoryProduct: "ChooseCategoryProduct",
}

type ModalName = keyof typeof modalListName | null;


type Category = {

	id: number,
	name: string,
	image_src: string | null,
}

type Product = {

	id: number,
	name: string,
	stock: number,
	unit: string,
	category_id: number,
	image_src: string | null,
}

type footerItem = {

	isFooter: boolean
}

declare namespace global {

	let forceRefresh: boolean;
	let btnState: boolean;
	let activeCategoryName: string;
	let activeProductName: string;
	let forceStockRefresh: boolean;
  
}