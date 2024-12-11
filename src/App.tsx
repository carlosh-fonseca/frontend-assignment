import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { Alert } from './shared/components/Alert/Alert';
import { Header } from './shared/components/Header/Header';
import { Modal } from './shared/components/Modal/Modal';
import { AlertProvider } from './shared/context/AlertContext';
import {
  ApiContext,
  FakeApiState,
  initialState,
} from './shared/context/ApiContext';
import { ModalProvider } from './shared/context/ModalContext';

export const queryClient = new QueryClient();

function App() {
  const [apiState, setApiState] = useState<FakeApiState>(initialState);
  return (
    <ApiContext.Provider value={{ apiState, setApiState }}>
      <ModalProvider>
        <AlertProvider>
          <QueryClientProvider client={queryClient}>
            <div className="relative">
              <Header />
              <Alert />
              <Modal />
              <Outlet />
            </div>
          </QueryClientProvider>
        </AlertProvider>
      </ModalProvider>
    </ApiContext.Provider>
  );
}

export default App;
