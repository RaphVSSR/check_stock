
import { ThemedText } from '@/components/ThemedText';
import dataAccess from '@/services/database/dataAccess';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';

type Props = {
  
  db: SQLite.SQLiteDatabase,
  categoryName: string,
  forceCountRefresh: boolean,
  setForceCountRefresh: React.Dispatch<React.SetStateAction<boolean>>,

}

export function CategoryStock({ db, categoryName, forceCountRefresh, setForceCountRefresh }: Props) {

  const [stock, setStock] = useState<number | string | null>(null);

  useEffect(() => {

    forceCountRefresh && setForceCountRefresh(false);

    dataAccess.categories.countCategory(db, categoryName)
    .then(count => {
      
        setStock(count as number | string);

      })
    .catch(error => {
      
      console.error(error)
      setStock("any");
    });

  }, [forceCountRefresh]);

  return (

    <ThemedText variant="cardSubtitle" color="titlesVisuals">

      Stock: {stock && stock}

    </ThemedText>

  );
}
