import { useCallback } from 'react';
import { yahubApi } from './yahubApi';
import { useAsyncData } from '../hooks/useAsyncData';

export function useOrganization() {
    return useAsyncData(useCallback(() => yahubApi.organization.get(), []));
}

export function useProjects() {
    return useAsyncData(useCallback(() => yahubApi.projects.list(), []));
}

export function useProjectDetails(slug: string | undefined) {
    return useAsyncData(useCallback(() => {
        if (!slug) {
            throw new Error('Projeto não informado.');
        }

        return yahubApi.projects.getBySlug(slug);
    }, [slug]));
}

export function useMembers() {
    return useAsyncData(useCallback(() => yahubApi.members.list(), []));
}

export function useMemberDetails(slug: string | undefined) {
    return useAsyncData(useCallback(() => {
        if (!slug) {
            throw new Error('Membro não informado.');
        }

        return yahubApi.members.getBySlug(slug);
    }, [slug]));
}

export function useActivity() {
    return useAsyncData(useCallback(() => yahubApi.activity.list(), []));
}

export function useAdminProjects() {
    return useAsyncData(useCallback(() => yahubApi.admin.projects.list(), []));
}

export function useAdminMembers() {
    return useAsyncData(useCallback(() => yahubApi.admin.members.list(), []));
}
