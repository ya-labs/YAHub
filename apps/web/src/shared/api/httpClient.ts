import type { Result } from './contracts';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type RequestOptions = {
    method?: HttpMethod;
    body?: unknown;
    token?: string;
};

export class ApiError extends Error {
    readonly status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

export function createHttpClient(baseUrl: string) {
    async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
        const response = await fetch(`${baseUrl}${path}`, {
            method: options.method ?? 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const payload = (await response.json().catch(() => null)) as Result<T> | null;

        if (!payload || typeof payload.result !== 'boolean' || !('data' in payload)) {
            throw new ApiError('A API retornou um formato diferente do envelope Result<T>.', response.status);
        }

        if (!response.ok || !payload.result) {
            throw new ApiError(payload.message ?? 'Não foi possível completar a operação.', response.status);
        }

        if (payload.data === null) {
            throw new ApiError('A API retornou sucesso sem dados para esta operação.', response.status);
        }

        return payload.data;
    }

    async function requestVoid(path: string, options: RequestOptions = {}): Promise<void> {
        const response = await fetch(`${baseUrl}${path}`, {
            method: options.method ?? 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
        });

        const payload = (await response.json().catch(() => null)) as Result<null> | null;

        if (!payload || typeof payload.result !== 'boolean') {
            throw new ApiError('A API retornou um formato diferente do envelope Result<T>.', response.status);
        }

        if (!response.ok || !payload.result) {
            throw new ApiError(payload.message ?? 'Não foi possível completar a operação.', response.status);
        }
    }

    return { request, requestVoid };
}
