import type {
    AdminUser,
    GithubRepository,
    LoginResponse,
    YahubApi,
} from './contracts';
import { mockActivity, mockMembers, mockOrganization, mockProjects } from './mockData';

function findOrFail<T extends { slug: string }>(items: T[], slug: string, entityName: string): T {
    const item = items.find((currentItem) => currentItem.slug === slug);

    if (!item) {
        throw new Error(`${entityName} não encontrado.`);
    }

    return item;
}

const adminUser: AdminUser = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Administrador YA LABS',
    email: 'admin@yalabs.local',
};

export const mockYahubApi: YahubApi = {
    auth: {
        login: async (): Promise<LoginResponse> => ({
            token: 'mock-jwt-token',
            user: adminUser,
        }),
        register: async () => adminUser,
    },
    organization: {
        get: async () => mockOrganization,
    },
    projects: {
        list: async () => mockProjects,
        getBySlug: async (slug) => findOrFail(mockProjects, slug, 'Projeto'),
    },
    members: {
        list: async () => mockMembers,
        getBySlug: async (slug) => findOrFail(mockMembers, slug, 'Membro'),
    },
    activity: {
        list: async () => mockActivity,
    },
    admin: {
        projects: {
            list: async () => mockProjects,
            create: async (payload) => ({ id: payload.slug, recentActivities: [], ...payload }),
            update: async (id, payload) => ({ id, recentActivities: [], ...payload }),
            remove: async () => undefined,
        },
        members: {
            list: async () => mockMembers,
            create: async (payload) => ({ id: payload.slug, ...payload }),
            update: async (id, payload) => ({ id, ...payload }),
            remove: async () => undefined,
        },
        githubRepositories: {
            list: async (): Promise<GithubRepository[]> =>
                mockProjects.map((project) => ({
                    githubRepositoryId: project.githubRepositoryId,
                    githubOwner: project.githubOwner,
                    githubName: project.githubName,
                    repositoryUrl: project.repositoryUrl,
                    primaryLanguage: project.primaryLanguage,
                    alreadyRegistered: true,
                })),
            resolve: async ({ repositoryUrl }) => ({
                githubRepositoryId: 'mock-resolved-repository',
                githubOwner: 'ya-labs',
                githubName: repositoryUrl.split('/').filter(Boolean).at(-1) ?? 'repositorio',
                repositoryUrl,
                primaryLanguage: null,
                alreadyRegistered: false,
            }),
        },
    },
};
