export type Result<T> = {
    result: boolean;
    message: string | null;
    data: T | null;
};

export type ProjectCategory = 'produto' | 'ecossistema';

export type ProjectAffiliation = 'oficial' | 'orientado';

export type ProjectStatus = 'ideia' | 'planejamento' | 'desenvolvimento' | 'ativo' | 'pausado' | 'arquivado';

export type ProjectVisibility = 'publico' | 'oculto';

export type ProjectSupportType = 'apoio_tecnico' | 'documentacao' | 'revisao' | 'divulgacao' | 'mentoria';

export type OrganizationLink = {
    label: string;
    url: string;
};

export type OrganizationStats = {
    projects: number;
    members: number;
};

export type Organization = {
    name: string;
    description: string;
    links: OrganizationLink[];
    stats: OrganizationStats;
    highlight?: string;
};

export type ProjectSummary = {
    id: string;
    slug: string;
    displayName: string;
    category: ProjectCategory;
    affiliation: ProjectAffiliation;
    shortDescription: string;
    status: ProjectStatus;
    primaryLanguage: string | null;
    repositoryUrl: string;
    websiteUrl: string | null;
    updatedAt: string | null;
    featured: boolean;
    authorDisplayName?: string | null;
    supportTypes?: ProjectSupportType[];
};

export type ProjectDetails = ProjectSummary & {
    githubRepositoryId: string;
    githubOwner: string;
    githubName: string;
    tagline: string;
    fullDescription: string;
    visibility: ProjectVisibility;
    documentationUrl: string | null;
    technologies: string[];
    displayOrder: number;
    yalabsMentorIds: string[];
    responsibleMemberIds: string[];
    recentActivities: ActivityItem[];
};

export type MemberSummary = {
    id: string;
    slug: string;
    name: string;
    role: string;
    githubUsername: string | null;
    spotifolioUsername: string | null;
    responsibilities: string[];
    projectSlugs: string[];
};

export type MemberDetails = MemberSummary & {
    bio: string | null;
    links: OrganizationLink[];
};

export type ActivityType = 'commit' | 'repository_update' | 'release';

export type ActivityItem = {
    id: string;
    type: ActivityType;
    projectSlug: string | null;
    projectName: string | null;
    description: string;
    author: string | null;
    occurredAt: string;
    referenceUrl: string | null;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RegisterRequest = LoginRequest & {
    name: string;
};

export type AdminUser = {
    id: string;
    name: string;
    email: string;
};

export type LoginResponse = {
    token: string;
    user: AdminUser;
};

export type ProjectPayload = Omit<ProjectDetails, 'id' | 'recentActivities'>;

export type MemberPayload = Omit<MemberDetails, 'id'>;

export type GithubRepository = {
    githubRepositoryId: string;
    githubOwner: string;
    githubName: string;
    repositoryUrl: string;
    primaryLanguage: string | null;
    technologies: string[];
    description: string | null;
    topics: string[];
    alreadyRegistered: boolean;
};

export type ResolveGithubRepositoryRequest = {
    repositoryUrl: string;
};

export type YahubApi = {
    auth: {
        login: (payload: LoginRequest) => Promise<LoginResponse>;
        register: (payload: RegisterRequest) => Promise<AdminUser>;
    };
    organization: {
        get: () => Promise<Organization>;
    };
    projects: {
        list: () => Promise<ProjectSummary[]>;
        getBySlug: (slug: string) => Promise<ProjectDetails>;
    };
    members: {
        list: () => Promise<MemberSummary[]>;
        getBySlug: (slug: string) => Promise<MemberDetails>;
    };
    activity: {
        list: () => Promise<ActivityItem[]>;
    };
    admin: {
        projects: {
            list: () => Promise<ProjectDetails[]>;
            create: (payload: ProjectPayload) => Promise<ProjectDetails>;
            update: (id: string, payload: ProjectPayload) => Promise<ProjectDetails>;
            remove: (id: string) => Promise<void>;
        };
        members: {
            list: () => Promise<MemberDetails[]>;
            create: (payload: MemberPayload) => Promise<MemberDetails>;
            update: (id: string, payload: MemberPayload) => Promise<MemberDetails>;
            remove: (id: string) => Promise<void>;
        };
        githubRepositories: {
            list: () => Promise<GithubRepository[]>;
            resolve: (payload: ResolveGithubRepositoryRequest) => Promise<GithubRepository>;
        };
    };
};
