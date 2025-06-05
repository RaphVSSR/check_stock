
//import fileManager from '@/services/files/global';
import * as SQLite from 'expo-sqlite';

export async function readProducts(db: SQLite.SQLiteDatabase){

	const stmt = await db.prepareAsync(`SELECT * FROM "Products"`);

	try {

		const result = await stmt.executeAsync();

		return await result.getAllAsync();
		
	} catch (error) {
		
		console.error(`Error to read the "Products" table: `, error);

	}finally{

		await stmt.finalizeAsync();
	}

}