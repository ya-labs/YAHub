import type { RouteObject } from 'react-router-dom';
import { HomePage } from '../features/home/pages/HomePage';
import { AdminPage } from '../features/admin/pages/AdminPage';
import { PortalPage } from '../features/portal/pages/PortalPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/portal',
        element: <PortalPage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    },
];
