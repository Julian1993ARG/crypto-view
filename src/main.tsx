import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { Home, Crypto, Saved, Trending } from './pages';
import { Routes } from './models';
import './index.css';
import { CryptoDetails } from './components';

const router = createBrowserRouter([
  {
    path: Routes.home,
    element: <Home />,
    children: [
      {
        path: Routes.home,
        element: <Crypto />,
        children: [
          {
            path: ':coinId',
            element: <CryptoDetails />
          }
        ]
      }, {
        path: Routes.trending,
        element: <Trending />,
        children: [
          {
            path: ':coinId',
            element: <CryptoDetails />
          }
        ]
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
