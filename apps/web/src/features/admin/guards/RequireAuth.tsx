import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAdminSession } from '../auth/adminAuth';

type RequireAuthProps = {
    children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();
    const isAdminAuthenticated = getAdminSession() !== null;

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return children;
}
