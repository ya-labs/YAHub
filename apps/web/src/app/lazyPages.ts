import { lazy } from 'react';

export const HomePage = lazy(() =>
    import('../features/home/pages/HomePage').then(({ HomePage }) => ({
        default: HomePage,
    })),
);

export const PortalPage = lazy(() =>
    import('../features/portal/pages/PortalHomePage').then(({ PortalHomePage }) => ({
        default: PortalHomePage,
    })),
);

export const PortalProjectsPage = lazy(() =>
    import('../features/portal/pages/PortalProjectsPage').then(({ PortalProjectsPage }) => ({
        default: PortalProjectsPage,
    })),
);

export const PortalProjectDetailsPage = lazy(() =>
    import('../features/portal/pages/PortalProjectDetailsPage').then(({ PortalProjectDetailsPage }) => ({
        default: PortalProjectDetailsPage,
    })),
);

export const PortalMembersPage = lazy(() =>
    import('../features/portal/pages/PortalMembersPage').then(({ PortalMembersPage }) => ({
        default: PortalMembersPage,
    })),
);

export const PortalMemberDetailsPage = lazy(() =>
    import('../features/portal/pages/PortalMemberDetailsPage').then(({ PortalMemberDetailsPage }) => ({
        default: PortalMemberDetailsPage,
    })),
);

export const PortalDocsPage = lazy(() =>
    import('../features/portal/pages/PortalDocsPage').then(({ PortalDocsPage }) => ({
        default: PortalDocsPage,
    })),
);

export const PortalActivityPage = lazy(() =>
    import('../features/portal/pages/PortalActivityPage').then(({ PortalActivityPage }) => ({
        default: PortalActivityPage,
    })),
);

export const AdminPage = lazy(() =>
    import('../features/admin/pages/AdminDashboardPage').then(({ AdminDashboardPage }) => ({
        default: AdminDashboardPage,
    })),
);

export const AdminLoginPage = lazy(() =>
    import('../features/admin/pages/AdminLoginPage').then(({ AdminLoginPage }) => ({
        default: AdminLoginPage,
    })),
);

export const AdminProjectsPage = lazy(() =>
    import('../features/admin/pages/AdminProjectsPage').then(({ AdminProjectsPage }) => ({
        default: AdminProjectsPage,
    })),
);

export const AdminMembersPage = lazy(() =>
    import('../features/admin/pages/AdminMembersPage').then(({ AdminMembersPage }) => ({
        default: AdminMembersPage,
    })),
);
