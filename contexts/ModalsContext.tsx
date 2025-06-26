import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {

  visibleModal: ModalName;
  openModal: (name: ModalName) => void;
  closeModal: () => void;

}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalsProvider({ children }: { children: React.ReactNode }){

  const [visibleModal, setVisibleModal] = useState<ModalName>(null);


  function openModal(name: ModalName){

    if (name) setVisibleModal(name);
    else console.error("Need a modal name to open it.");
    
  };

  function closeModal(){

    setVisibleModal(null);

  };


  return (

    <ModalContext.Provider value={{ visibleModal, openModal, closeModal }}>

      {children}

    </ModalContext.Provider>
  );
};

export function useModal(){

  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  
  return context;

};
