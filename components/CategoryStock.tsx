
import dataAccess from '@/services/database/dataAccess';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { ThemedText } from './ThemedText';

export function CategoryStock({ db, categoryName }: { db: SQLite.SQLiteDatabase, categoryName: string }) {

  const [stock, setStock] = useState<number | string | null>(null);

  useEffect(() => {
	
    dataAccess.categories.countCategory(db, categoryName)
	.then(count => {
		
    	setStock(count as number | string);

    })
	.catch(error => {
		
		console.error(error)
		setStock("any");
	});

  }, [db, categoryName]);

  return (

    <ThemedText variant="cardSubtitle" color="titlesVisuals">

      Stock: {stock && stock}

    </ThemedText>

  );
}
