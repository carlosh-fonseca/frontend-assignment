import { createContext, ReactNode, useMemo, useState } from 'react';
export interface ModalOptions {
  title?: string;
  content: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
}

export interface ModalContextType {
  isOpen: boolean;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  content: ReactNode;
  title?: string;
  footer?: ReactNode;
  onClose?: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [content, setContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [footer, setFooter] = useState<ReactNode | undefined>(undefined);

  const [onClose, setOnClose] = useState<(() => void) | undefined>(undefined);

  const openModal = ({ title, content, footer, onClose }: ModalOptions) => {
    setTitle(title);
    setContent(content);
    setFooter(footer);
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
      footer,
      onClose,
    }),
    [isOpen, content, title, footer, onClose],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
