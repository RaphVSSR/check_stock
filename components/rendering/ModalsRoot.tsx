
import RenderAddCategoryModal from '@/components/rendering/categories/modals/RenderAddCategoryModal';
import RenderDelCategoryModal from '@/components/rendering/categories/modals/RenderDelCategoryModal';
import RenderModCategoryModal from '@/components/rendering/categories/modals/RenderModCategoryModal';
import { useModal } from '@/contexts/ModalsContext';
import React from 'react';
import RenderChooseCategoryProductModal from './(chooseCategoryProductModal)/RenderChooseCategoryProductModal';
import RenderAddProductModal from './products/modals/RenderAddProductModal';
import RenderAddStockProductModal from './products/modals/RenderAddStockProductModal';
import RenderRemStockProductModal from './products/modals/RenderRemStockProductModal';
import RenderDelProductModal from './products/modals/RenderDelProductModal';
import RenderModProductModal from './products/modals/RenderModProductModal';

export default function ModalsRoot() {

  const { visibleModal, openModal, closeModal } = useModal();

  return (
    <>
      
      {/*====== Categories ======*/}

      <RenderAddCategoryModal 

        visibility={visibleModal}			
        closeModal={closeModal}
        openModal={openModal}/>

      <RenderModCategoryModal 

        visibility={visibleModal} 
        closeModal={closeModal} 
        openModal={openModal}/>

      <RenderDelCategoryModal

        visibility={visibleModal} 
        closeModal={closeModal} 
        openModal={openModal}/>

      <RenderChooseCategoryProductModal

        visibility={visibleModal} 
        closeModal={closeModal} 
        openModal={openModal}/>


      {/*====== Products ======*/}

      <RenderAddProductModal

        visibility={visibleModal} 
        closeModal={closeModal}
        openModal={openModal}/>

      <RenderModProductModal 

        visibility={visibleModal} 
        closeModal={closeModal} 
        openModal={openModal}/>

      <RenderDelProductModal

        visibility={visibleModal} 
        closeModal={closeModal} 
        openModal={openModal}/>

      <RenderAddStockProductModal

        visibility={visibleModal}
        closeModal={closeModal}
        openModal={openModal}/>

      <RenderRemStockProductModal

        visibility={visibleModal}
        closeModal={closeModal}
        openModal={openModal}/>

    </>
  );
}
