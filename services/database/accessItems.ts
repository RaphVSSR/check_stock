
import * as SQLite from 'expo-sqlite';

type categoryOrProduct = Category | Product;

export async function readItemsFromParent(db: SQLite.SQLiteDatabase, parentId: number): Promise<categoryOrProduct[]>{

	const categoryStmt = await db.prepareAsync(`SELECT * FROM "Categories" WHERE parent_id = ?`);
	const productStmt = await db.prepareAsync(`SELECT * FROM "Products" WHERE category_id = ?`);

	try {

		const categoryResult = await categoryStmt.executeAsync(parentId.toString());
		const sortedCategories = await categoryResult.getAllAsync() as Category[];

		const productsResult = await productStmt.executeAsync(parentId.toString());
		const sortedProducts = await productsResult.getAllAsync() as Product[];

		return [...sortedCategories, ...sortedProducts];
		
	} catch (error) {
		
		console.error(`Error to read the differents items between table "Categories" and "Products" : `, error);
		throw error;

	}finally{

		await categoryStmt.finalizeAsync();
		await productStmt.finalizeAsync();
	}

}