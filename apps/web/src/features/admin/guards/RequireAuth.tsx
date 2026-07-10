import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type RequireAuthProps = {
    children: ReactNode;
};

const isAdminAuthenticated = false;

export function RequireAuth({ children }: RequireAuthProps) {
    const location = useLocation();

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace state={{ from: location }} />;
    }

    return children;
}
