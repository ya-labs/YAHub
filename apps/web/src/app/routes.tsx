import type { RouteObject } from 'react-router-dom';
import { AdminShell } from '../features/admin/layouts/AdminShell';
import { RequireAuth } from '../features/admin/guards/RequireAuth';
import { PortalShell } from '../features/portal/layouts/PortalShell';
import {
    AdminLoginPage,
    AdminMembersPage,
    AdminPage,
    AdminProjectFormPage,
    AdminProjectsPage,
    HomePage,
    PortalActivityPage,
    PortalDocsPage,
    PortalMemberDetailsPage,
    PortalMembersPage,
    PortalPage,
    PortalProjectDetailsPage,
    PortalProjectsPage,
} from './lazyPages';
import { withSuspense } from './withSuspense';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: withSuspense(<HomePage />),
    },
    {
        path: '/portal',
        element: <PortalShell />,
        children: [
            {
                index: true,
                element: withSuspense(<PortalPage />),
            },
            {
                path: 'projetos',
                element: withSuspense(<PortalProjectsPage />),
            },
            {
                path: 'projetos/:slug',
                element: withSuspense(<PortalProjectDetailsPage />),
            },
            {
                path: 'membros',
                element: withSuspense(<PortalMembersPage />),
            },
            {
                path: 'membros/:slug',
                element: withSuspense(<PortalMemberDetailsPage />),
            },
            {
                path: 'docs',
                element: withSuspense(<PortalDocsPage />),
            },
            {
                path: 'atividade',
                element: withSuspense(<PortalActivityPage />),
            },
        ],
    },
    {
        path: '/admin',
        element: (
            <RequireAuth>
                <AdminShell />
            </RequireAuth>
        ),
        children: [
            {
                index: true,
                element: withSuspense(<AdminPage />),
            },
            {
                path: 'projetos',
                element: withSuspense(<AdminProjectsPage />),
            },
            {
                path: 'projetos/novo',
                element: withSuspense(<AdminProjectFormPage />),
            },
            {
                path: 'projetos/:projectId/editar',
                element: withSuspense(<AdminProjectFormPage />),
            },
            {
                path: 'membros',
                element: withSuspense(<AdminMembersPage />),
            },
        ],
    },
    {
        path: '/admin/login',
        element: withSuspense(<AdminLoginPage />),
    },
];
