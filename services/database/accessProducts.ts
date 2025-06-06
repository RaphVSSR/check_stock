
import { Product } from '@/constants/types';
import fileManager from '@/services/files/fileManager';
import global from "@/utils/global";
import * as SQLite from 'expo-sqlite';


export async function addProduct(db: SQLite.SQLiteDatabase, name: string, nbStock: string = "0", unitSelected: string, imgPickerSrc: string | null){

	if (!name) throw new Error("Le nom doit être rempli");
	if (!unitSelected) throw new Error("L'unité doit être remplie");
	

	let fields = ['name', 'stock', 'unit', "category_id"];
	let values: any[] = [name, nbStock, unitSelected, global.activeCategoryId];
	let placeholders = ["?", "?", "?", "?"];

	const localImgSrc = imgPickerSrc && await fileManager.products.saveProductImage(imgPickerSrc, name);
	
	if (imgPickerSrc){
		
		fields.push("'image_src'");
		values.push(localImgSrc);
		placeholders.push("?");
	}

	const stmt = await db.prepareAsync(`INSERT INTO "Products" (${fields.join(", ")}) VALUES (${placeholders.join(", ")})`);

	try {

		await stmt.executeAsync(values);
		
	} catch (error: any) {
		
		if (error.message.includes('UNIQUE constraint failed')) {

			throw new Error("Ce nom de produit existe déjà..");

		} else {

			throw new Error("Failed to add to the bdd, ", error.message);

		}

	}finally{

		await stmt.finalizeAsync();
	}
}

export async function readProducts(db: SQLite.SQLiteDatabase, categoryId: string): Promise<Product[]>{

	const stmt = await db.prepareAsync(`SELECT * FROM "Products" WHERE category_id = ?`);

	try {

		const result = await stmt.executeAsync(categoryId);
		
		return await result.getAllAsync() as Product[];
		
	} catch (error) {
		
		console.error(`Error to read the "Product" table: `, error);
		throw error;

	}finally{

		await stmt.finalizeAsync();
	}

}

export async function readProduct(db: SQLite.SQLiteDatabase, name: string): Promise<Product>{

	const stmt = await db.prepareAsync(`SELECT * FROM "Products" WHERE name= ?`);

	try {

		const result = await stmt.executeAsync([name]);

		return await result.getFirstAsync() as Product;
		
	} catch (error) {
		
		console.error(`Error to read the "Products" table: `, error);
		throw error;

	}finally{

		await stmt.finalizeAsync();
	}

}

export async function modifyProduct(db: SQLite.SQLiteDatabase, product: Product, newName: string | null, stock: string, unit: string, imgPickerSrc?: string | null){

	if ((!newName && !stock && !unit && !imgPickerSrc) || (!newName && !stock && !unit && ("id" in product) && (imgPickerSrc === product.image_src))) throw new Error("Aucun champ n'a été modifié..");

	let fields = [];
	let values = [];

	if ("id" in product){

		if (imgPickerSrc) {

			let localImgSrc;

			fields.push('"image_src" = ?');

			product.image_src && await fileManager.products.deleteProductImage(product.image_src);
			
			if (newName){
	
				localImgSrc = await fileManager.products.saveProductImage(imgPickerSrc, newName);

				values.push(localImgSrc);

			}else{

				localImgSrc = await fileManager.products.saveProductImage(imgPickerSrc, product.name);

				values.push(localImgSrc);

			}
	
		}

		if (newName) {
			
			fields.push('"name" = ?');
			values.push(newName);
		};

		if (stock) {
			
			fields.push('"stock" = ?');
			values.push(stock);
		};

		if (unit) {
			
			fields.push('"unit" = ?');
			values.push(unit);
		};
		
		values.push(product.id);
	
		const stmt = await db.prepareAsync(`UPDATE "Products" SET ${fields.join(", ")} WHERE "id" = ?`);

		try {
			
			await stmt.executeAsync(values);
			
		} catch (error: any) {
			
			if (error.message.includes('UNIQUE constraint failed')) {

				throw new Error("Quelque chose dans ce produit existe déjà tel quel..");
				

			} else {

				throw new Error("Failed to modify in the database, ", error);

			}

		}finally{

			await stmt.finalizeAsync();
		}
	}

}

export async function deleteProduct(db: SQLite.SQLiteDatabase, name: string) {

	const product = await readProduct(db, name);

	("image_src" in product && product.image_src) && fileManager.products.deleteProductImage(product.image_src);
	

	const stmt = await db.prepareAsync(`DELETE FROM "Products" WHERE name = ?`);
  
	try {

		await stmt.executeAsync([name]);

	} catch (error: any) {

		throw new Error(`Error while deleting the product '${name}', `, error);

	}finally{

		await stmt.finalizeAsync();
	}

}