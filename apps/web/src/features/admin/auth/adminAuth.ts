import { yahubApi } from '../../../shared/api/yahubApi';
import type { AdminUser, LoginRequest, RegisterRequest } from '../../../shared/api/contracts';

export type AdminSession = {
    token: string;
    user: AdminUser;
    authenticatedAt: string;
};

export const ADMIN_SESSION_STORAGE_KEY = 'yahub.admin.session';

function canUseStorage() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getAdminSession(): AdminSession | null {
    if (!canUseStorage()) {
        return null;
    }

    const storedSession = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);

    if (!storedSession) {
        return null;
    }

    try {
        const session = JSON.parse(storedSession) as AdminSession;

        if (!session.token || !session.user?.email) {
            clearAdminSession();
            return null;
        }

        return session;
    } catch {
        clearAdminSession();
        return null;
    }
}

export function saveAdminSession(token: string, user: AdminUser): AdminSession {
    const session: AdminSession = {
        token,
        user,
        authenticatedAt: new Date().toISOString(),
    };

    if (canUseStorage()) {
        window.localStorage.setItem(ADMIN_SESSION_STORAGE_KEY, JSON.stringify(session));
    }

    return session;
}

export function clearAdminSession() {
    if (canUseStorage()) {
        window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    }
}

export async function loginAdmin(payload: LoginRequest): Promise<AdminSession> {
    const response = await yahubApi.auth.login(payload);

    return saveAdminSession(response.token, response.user);
}

export async function registerAdmin(payload: RegisterRequest): Promise<AdminSession> {
    await yahubApi.auth.register(payload);

    return loginAdmin({
        email: payload.email,
        password: payload.password,
    });
}
