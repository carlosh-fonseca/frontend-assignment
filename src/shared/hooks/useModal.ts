import { useContext } from 'react';
import { ModalContext, ModalContextType } from '../context/ModalContext';

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be in ModalProvider');
  }
  return context;
};
