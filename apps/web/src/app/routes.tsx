import { Suspense } from 'react';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';
import { PortalShell } from '../features/portal/layouts/PortalShell';
import {
    AdminLoginPage,
    AdminMembersPage,
    AdminPage,
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

function withSuspense(element: ReactNode) {
    return (
        <Suspense fallback={<p>Carregando página...</p>}>
            {element}
        </Suspense>
    )
}

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
        element: withSuspense(<AdminPage />),
    },
    {
        path: '/admin/login',
        element: withSuspense(<AdminLoginPage />),
    },
    {
        path: '/admin/projetos',
        element: withSuspense(<AdminProjectsPage />),
    },
    {
        path: '/admin/membros',
        element: withSuspense(<AdminMembersPage />),
    },
];
