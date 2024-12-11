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
      <div className="flex w-screen h-screen">
        <div className="m-auto">
          Page not found <NavLink to="/">Go to Feed</NavLink>
        </div>
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
