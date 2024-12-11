import { createContext, ReactNode, useMemo, useState } from 'react';
export interface AlertOptions {
  message: string;
  type?: 'error' | 'success';
}

export interface AlertContextType {
  isOpen: boolean;
  openAlert: (options: AlertOptions) => void;
  message?: string;
  type: 'error' | 'success';
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined,
);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'error' | 'success'>('success');

  const openAlert = ({ message, type = 'success' }: AlertOptions) => {
    setMessage(message);
    setType(type);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  };

  const contextValue = useMemo(
    () => ({
      isOpen,
      openAlert,
      message,
      type,
    }),
    [isOpen, message, type],
  );

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};
