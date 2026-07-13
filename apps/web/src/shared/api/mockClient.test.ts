import { afterEach, describe, expect, it } from 'vitest';
import type { MemberDetails, MemberPayload, ProjectDetails, ProjectPayload } from './contracts';
import { mockYahubApi, resetMockAdminData } from './mockClient';

afterEach(() => {
    resetMockAdminData();
});

function toProjectPayload(project: ProjectDetails, overrides: Partial<ProjectPayload> = {}): ProjectPayload {
    return {
        slug: project.slug,
        githubRepositoryId: project.githubRepositoryId,
        githubOwner: project.githubOwner,
        githubName: project.githubName,
        displayName: project.displayName,
        tagline: project.tagline,
        category: project.category,
        affiliation: project.affiliation,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        status: project.status,
        visibility: project.visibility,
        primaryLanguage: project.primaryLanguage,
        repositoryUrl: project.repositoryUrl,
        websiteUrl: project.websiteUrl,
        documentationUrl: project.documentationUrl,
        technologies: project.technologies,
        updatedAt: project.updatedAt,
        featured: project.featured,
        displayOrder: project.displayOrder,
        yalabsMentorIds: project.yalabsMentorIds,
        responsibleMemberIds: project.responsibleMemberIds,
        authorDisplayName: project.authorDisplayName,
        supportTypes: project.supportTypes,
        ...overrides,
    };
}

function toMemberPayload(member: MemberDetails, overrides: Partial<MemberPayload> = {}): MemberPayload {
    return {
        slug: member.slug,
        name: member.name,
        role: member.role,
        githubUsername: member.githubUsername,
        spotifolioUsername: member.spotifolioUsername,
        responsibilities: member.responsibilities,
        projectSlugs: member.projectSlugs,
        bio: member.bio,
        links: member.links,
        ...overrides,
    };
}

describe('mockYahubApi admin data', () => {
    it('mantém projetos administrativos separados dos projetos públicos', async () => {
        const [adminProject] = await mockYahubApi.admin.projects.list();
        const publicProject = await mockYahubApi.projects.getBySlug(adminProject.slug);
        const updatedPayload = toProjectPayload(adminProject, {
            displayName: 'YAHub Admin Editado',
        });

        await mockYahubApi.admin.projects.update(adminProject.id, updatedPayload);

        const updatedAdminProject = await mockYahubApi.admin.projects.list();
        const publicProjects = await mockYahubApi.projects.list();

        expect(updatedAdminProject.find((project) => project.id === publicProject.id)?.displayName).toBe(
            'YAHub Admin Editado',
        );
        expect(publicProjects.find((project) => project.id === publicProject.id)?.displayName).toBe(
            publicProject.displayName,
        );
    });

    it('cria e remove projetos apenas no estado administrativo local', async () => {
        const [baseProject] = await mockYahubApi.admin.projects.list();
        const payload = toProjectPayload(baseProject, {
            slug: 'projeto-admin-local',
            displayName: 'Projeto Admin Local',
            githubRepositoryId: 'ya-labs-projeto-admin-local',
            githubName: 'projeto-admin-local',
            repositoryUrl: 'https://github.com/ya-labs/projeto-admin-local',
        });

        const createdProject = await mockYahubApi.admin.projects.create(payload);
        expect(createdProject.id).toBe('projeto-admin-local');
        await expect(mockYahubApi.projects.getBySlug('projeto-admin-local')).rejects.toThrow(
            'Projeto não encontrado.',
        );

        await mockYahubApi.admin.projects.remove(createdProject.id);

        const adminProjects = await mockYahubApi.admin.projects.list();
        expect(adminProjects.some((project) => project.id === createdProject.id)).toBe(false);
    });

    it('mantém membros administrativos separados dos membros públicos', async () => {
        const [adminMember] = await mockYahubApi.admin.members.list();
        const publicMember = await mockYahubApi.members.getBySlug(adminMember.slug);
        const updatedPayload = toMemberPayload(adminMember, {
            name: 'Membro Admin Editado',
        });

        await mockYahubApi.admin.members.update(adminMember.id, updatedPayload);

        const updatedAdminMembers = await mockYahubApi.admin.members.list();
        const publicMembers = await mockYahubApi.members.list();

        expect(updatedAdminMembers.find((member) => member.id === publicMember.id)?.name).toBe('Membro Admin Editado');
        expect(publicMembers.find((member) => member.id === publicMember.id)?.name).toBe(publicMember.name);
    });

    it('cria e remove membros apenas no estado administrativo local', async () => {
        const [baseMember] = await mockYahubApi.admin.members.list();
        const payload = toMemberPayload(baseMember, {
            slug: 'membro-admin-local',
            name: 'Membro Admin Local',
            githubUsername: 'membro-admin-local',
        });

        const createdMember = await mockYahubApi.admin.members.create(payload);
        expect(createdMember.id).toBe('membro-admin-local');
        await expect(mockYahubApi.members.getBySlug('membro-admin-local')).rejects.toThrow('Membro não encontrado.');

        await mockYahubApi.admin.members.remove(createdMember.id);

        const adminMembers = await mockYahubApi.admin.members.list();
        expect(adminMembers.some((member) => member.id === createdMember.id)).toBe(false);
    });

    it('devolve cópias para que mutações do consumidor não alterem o estado administrativo', async () => {
        const [adminProject] = await mockYahubApi.admin.projects.list();
        const [adminMember] = await mockYahubApi.admin.members.list();

        adminProject.technologies.push('Mutação externa');
        adminMember.responsibilities.push('Mutação externa');

        const [storedProject] = await mockYahubApi.admin.projects.list();
        const [storedMember] = await mockYahubApi.admin.members.list();

        expect(storedProject.technologies).not.toContain('Mutação externa');
        expect(storedMember.responsibilities).not.toContain('Mutação externa');
    });
});
