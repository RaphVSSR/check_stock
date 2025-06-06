
import { Category } from '@/constants/types';
import fileManager from '@/services/files/fileManager';
import * as SQLite from 'expo-sqlite';


export async function addCategory(db: SQLite.SQLiteDatabase, name: string, imgPickerSrc: string | null){

	if (!name) throw new Error("Le nom doit être rempli");
	

	let fields = [];
	let values = [];

	const localImgSrc = imgPickerSrc && await fileManager.categories.saveCategoryImage(imgPickerSrc, name);
		
	fields.push("'name'");
	values.push(name);

	if (imgPickerSrc){
		
		fields.push("'image_src'");
		values.push(localImgSrc);
	}


	const stmt = await db.prepareAsync(`INSERT INTO "Categories" (${fields.join(", ")}) VALUES (? , ?)`);

	try {

		await stmt.executeAsync(values);
		
	} catch (error: any) {
		
		if (error.message.includes('UNIQUE constraint failed')) {

			throw new Error("Ce nom de catégorie existe déjà..");

		} else {

			throw new Error("Failed to add to the bdd, ", error);

		}

	}finally{

		await stmt.finalizeAsync();
	}
}

export async function readCategories(db: SQLite.SQLiteDatabase): Promise<Category[]>{

	const stmt = await db.prepareAsync(`SELECT * FROM "Categories"`);

	try {

		const result = await stmt.executeAsync();

		return await result.getAllAsync() as Category[];
		
	} catch (error) {
		
		console.error(`Error to read the "Categories" table: `, error);
		throw error;

	}finally{

		await stmt.finalizeAsync();
	}

}

export async function readCategory(db: SQLite.SQLiteDatabase, name: string): Promise<Category>{

	const stmt = await db.prepareAsync(`SELECT * FROM "Categories" WHERE name= ?`);

	try {

		const result = await stmt.executeAsync([name]);

		return await result.getFirstAsync() as Category;
		
	} catch (error) {
		
		console.error(`Error to read the "Categories" table: `, error);
		throw error;

	}finally{

		await stmt.finalizeAsync();
	}

}

export async function countCategory(db: SQLite.SQLiteDatabase, categoryName: string) {

	const stmtCat = await db.prepareAsync(`SELECT id FROM Categories WHERE name = ?`);
	const stmtProd = await db.prepareAsync(`SELECT COUNT(*) as count FROM Products WHERE category_id = ?`);

	try {
		
		const resultCat = await stmtCat.executeAsync([categoryName]);
		const catRow = await resultCat.getFirstAsync() as {id: number};

		try {
			
			const resultProd = await stmtProd.executeAsync([catRow.id]);

			const rows = await resultProd.getFirstAsync() as {count: number};
			
			return rows.count ?? 0 as number;

		} catch (error: any) {
		
			if (error.message.includes("no such column: category_id")){

				throw new Error(error.message);

			}else{

				console.error(`Erreur dans la recherche de la table Products :`, error);
				return "any";
			}
		}

	} catch (error) {

		console.error(`Erreur lors du comptage des lignes de ${categoryName} :`, error);
		return "any";

	}finally{

		await stmtCat.finalizeAsync();
		await stmtProd.finalizeAsync();

	}
}

export async function modifyCategory(db: SQLite.SQLiteDatabase, category: Category, newName: string | null, imgPickerSrc?: string | null){

	if ((!newName && !imgPickerSrc) || (!newName && ("id" in category) && (imgPickerSrc === category.image_src))) throw new Error("Aucun champ n'a été modifié..");

	let fields = [];
	let values = [];

	if ("id" in category){

		if (imgPickerSrc) {

			let localImgSrc;

			fields.push('"image_src" = ?');

			category.image_src && await fileManager.categories.deleteCategoryImage(category.image_src);
			
			if (newName){
	
				localImgSrc = await fileManager.categories.saveCategoryImage(imgPickerSrc, newName);

				values.push(localImgSrc);

			}else{

				localImgSrc = await fileManager.categories.saveCategoryImage(imgPickerSrc, category.name);

				values.push(localImgSrc);

			}
	
		}

		if (newName) {
			
			fields.push('"name" = ?');
			values.push(newName);
		};
		
		values.push(category.id);
	
		const stmt = await db.prepareAsync(`UPDATE "Categories" SET ${fields.join(", ")} WHERE "id" = ?`);

		try {
			
			await stmt.executeAsync(values);
			
		} catch (error: any) {
			
			if (error.message.includes('UNIQUE constraint failed')) {

				throw new Error("Cette catégorie existe déjà..");
				

			} else {

				throw new Error("Failed to modify in the database, ", error);

			}

		}finally{

			await stmt.finalizeAsync();
		}
	}

}

export async function deleteCategory(db: SQLite.SQLiteDatabase, name: string) {

	const category = await readCategory(db, name);

	("image_src" in category && category.image_src) && fileManager.categories.deleteCategoryImage(category.image_src);
	

	const stmt = await db.prepareAsync(`DELETE FROM "Categories" WHERE name = ?`);
  
	try {

		await stmt.executeAsync([name]);

	} catch (error: any) {

		throw new Error(`Error while deleting the category '${name}', `, error);

	}finally{

		await stmt.finalizeAsync();
	}

}