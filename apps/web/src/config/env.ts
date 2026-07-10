export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
    dataSource: import.meta.env.VITE_DATA_SOURCE === 'api' ? 'api' : 'mock',
} as const;
