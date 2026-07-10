import { env } from '../../config/env';
import type { YahubApi } from './contracts';
import { createHttpClient } from './httpClient';

const http = createHttpClient(env.apiBaseUrl);

export const httpYahubApi: YahubApi = {
    auth: {
        login: (payload) => http.request('/login', { method: 'POST', body: payload }),
        register: (payload) => http.request('/register', { method: 'POST', body: payload }),
    },
    organization: {
        get: () => http.request('/organization'),
    },
    projects: {
        list: () => http.request('/projects'),
        getBySlug: (slug) => http.request(`/projects/${slug}`),
    },
    members: {
        list: () => http.request('/members'),
        getBySlug: (slug) => http.request(`/members/${slug}`),
    },
    activity: {
        list: () => http.request('/activity'),
    },
    admin: {
        projects: {
            list: () => http.request('/admin/projects'),
            create: (payload) => http.request('/admin/projects', { method: 'POST', body: payload }),
            update: (id, payload) => http.request(`/admin/projects/${id}`, { method: 'PUT', body: payload }),
            remove: (id) => http.requestVoid(`/admin/projects/${id}`, { method: 'DELETE' }),
        },
        members: {
            list: () => http.request('/admin/members'),
            create: (payload) => http.request('/admin/members', { method: 'POST', body: payload }),
            update: (id, payload) => http.request(`/admin/members/${id}`, { method: 'PUT', body: payload }),
            remove: (id) => http.requestVoid(`/admin/members/${id}`, { method: 'DELETE' }),
        },
        githubRepositories: {
            list: () => http.request('/admin/github/repositories'),
            resolve: (payload) =>
                http.request('/admin/github/repositories/resolve', { method: 'POST', body: payload }),
        },
    },
};
