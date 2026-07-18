import type {
    AdminUser,
    GithubRepository,
    LoginResponse,
    MemberDetails,
    MemberPayload,
    ProjectDetails,
    ProjectPayload,
    YahubApi,
} from './contracts';
import { mockActivity, mockGithubRepositories, mockMembers, mockOrganization, mockProjects } from './mockData';

function cloneData<T>(data: T): T {
    return JSON.parse(JSON.stringify(data)) as T;
}

function findOrFail<T extends { slug: string }>(items: T[], slug: string, entityName: string): T {
    const item = items.find((currentItem) => currentItem.slug === slug);

    if (!item) {
        throw new Error(`${entityName} não encontrado.`);
    }

    return item;
}

function findByIdOrFail<T extends { id: string }>(items: T[], id: string, entityName: string): T {
    const item = items.find((currentItem) => currentItem.id === id);

    if (!item) {
        throw new Error(`${entityName} não encontrado.`);
    }

    return item;
}

let adminProjects: ProjectDetails[] = cloneData(mockProjects);
let adminMembers: MemberDetails[] = cloneData(mockMembers);

const adminUser: AdminUser = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'Administrador YA LABS',
    email: 'admin@yalabs.local',
};

export function resetMockAdminData() {
    adminProjects = cloneData(mockProjects);
    adminMembers = cloneData(mockMembers);
}

function createProjectDetails(payload: ProjectPayload, id = payload.slug): ProjectDetails {
    return {
        id,
        recentActivities: [],
        ...payload,
    };
}

function createMemberDetails(payload: MemberPayload, id = payload.slug): MemberDetails {
    return {
        id,
        ...payload,
    };
}

export const mockYahubApi: YahubApi = {
    auth: {
        login: async (): Promise<LoginResponse> => ({
            token: 'mock-jwt-token',
            user: adminUser,
        }),
        register: async (payload) => ({
            id: payload.email,
            name: payload.name,
            email: payload.email,
        }),
    },
    organization: {
        get: async () => cloneData(mockOrganization),
    },
    projects: {
        list: async () => cloneData(mockProjects),
        getBySlug: async (slug) => cloneData(findOrFail(mockProjects, slug, 'Projeto')),
    },
    members: {
        list: async () => cloneData(mockMembers),
        getBySlug: async (slug) => cloneData(findOrFail(mockMembers, slug, 'Membro')),
    },
    activity: {
        list: async () => cloneData(mockActivity),
    },
    admin: {
        projects: {
            list: async () => cloneData(adminProjects),
            create: async (payload) => {
                const project = createProjectDetails(payload);
                adminProjects = [...adminProjects, project];

                return cloneData(project);
            },
            update: async (id, payload) => {
                findByIdOrFail(adminProjects, id, 'Projeto');

                const updatedProject = createProjectDetails(payload, id);
                adminProjects = adminProjects.map((project) => (project.id === id ? updatedProject : project));

                return cloneData(updatedProject);
            },
            remove: async (id) => {
                findByIdOrFail(adminProjects, id, 'Projeto');
                adminProjects = adminProjects.filter((project) => project.id !== id);
            },
        },
        members: {
            list: async () => cloneData(adminMembers),
            create: async (payload) => {
                const member = createMemberDetails(payload);
                adminMembers = [...adminMembers, member];

                return cloneData(member);
            },
            update: async (id, payload) => {
                findByIdOrFail(adminMembers, id, 'Membro');

                const updatedMember = createMemberDetails(payload, id);
                adminMembers = adminMembers.map((member) => (member.id === id ? updatedMember : member));

                return cloneData(updatedMember);
            },
            remove: async (id) => {
                findByIdOrFail(adminMembers, id, 'Membro');
                adminMembers = adminMembers.filter((member) => member.id !== id);
            },
        },
        githubRepositories: {
            list: async (): Promise<GithubRepository[]> => cloneData(mockGithubRepositories),
            resolve: async ({ repositoryUrl }) => {
                const normalizedUrl = repositoryUrl.trim().replace(/\/$/, '').toLowerCase();
                const repository = mockGithubRepositories.find(
                    (item) => item.repositoryUrl.replace(/\/$/, '').toLowerCase() === normalizedUrl,
                );

                if (repository) return cloneData(repository);

                return {
                    githubRepositoryId: 'mock-resolved-repository',
                    githubOwner: 'ya-labs',
                    githubName: repositoryUrl.split('/').filter(Boolean).at(-1) ?? 'repositorio',
                    repositoryUrl: repositoryUrl.trim(),
                    primaryLanguage: null,
                    description: 'Dados simulados para um repositório informado por URL.',
                    topics: [],
                    alreadyRegistered: false,
                };
            },
        },
    },
};
