import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Home, Crypto, Saved, Trending } from './pages';
import { Routes } from './models';
import './index.css';

const router = createBrowserRouter([
  {
    path: Routes.home,
    element: <Home />,
    children: [
      {
        path: Routes.home,
        element: <Crypto />
      }, {
        path: Routes.trending,
        element: <Trending />
      }, {
        path: Routes.saved,
        element: <Saved />
      }
    ]
  }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
