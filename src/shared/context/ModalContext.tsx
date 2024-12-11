import { createContext, ReactNode, useMemo, useState } from 'react';
export interface ModalOptions {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  content: ReactNode;
  title?: string;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

  const openModal = ({ title, content }: ModalOptions) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
    setOnClose(() => onClose);
  };

  const closeModal = () => setIsOpen(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
      content,
      title,
    }),
    [isOpen, content, title],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
