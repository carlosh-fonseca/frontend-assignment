import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, NavLink, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { pages } from './pages/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <div>
        Pagina não enontrada <NavLink to="/">Voltaar para o Feed</NavLink>
      </div>
    ),
    children: [
      ...pages.map((page) => ({
        path: page.path,
        element: page.component,
      })),
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
