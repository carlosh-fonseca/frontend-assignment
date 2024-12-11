import { useContext } from 'react';
import { ModalContext, ModalContextType } from '../context/ModalContext';

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal tem que ser usado dentro de um ModalProvider');
  }
  return context;
};
