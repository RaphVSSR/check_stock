
export type Category = 

	|{

		id: number,
		name: string,
		image_src: string | null,
	}
	|{ 
		isFooter: boolean

	}

export type Product = 

	|{

		id: number,
		name: string,
		stock: number,
		unit: string,
		category_id: number,
		image_src: string | null,
	}
	|{ 
		isFooter: boolean

	}