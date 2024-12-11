import { useContext } from 'react';
import { AlertContext, AlertContextType } from '../context/AlertContext';

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be inside ModalProvider');
  }
  return context;
};
