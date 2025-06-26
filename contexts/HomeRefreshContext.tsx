
import { homeDataListRef } from "@/app/(tabs)/(home)/Home";
import { createContext, useRef, useState } from "react";

type RefreshContextType = {

  homeDataListRef: React.RefObject<homeDataListRef | null>;
  historyListCategories: { id: number; name: string }[];
  setHistoryListCategories: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
}

export const RefreshContext = createContext<RefreshContextType | null>(null);


export default function HomeRefreshProvider({ children }: { children: React.ReactNode }){

  const homeDataListRef = useRef<homeDataListRef>(null);
	const [historyListCategories, setHistoryListCategories] = useState<{id: number, name: string}[]>([{id: 0, name: "Accueil"}]);

  return (

    <RefreshContext.Provider value={{homeDataListRef, historyListCategories, setHistoryListCategories}}>

      {children}

    </RefreshContext.Provider>
  );

}
