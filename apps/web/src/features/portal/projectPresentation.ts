import type { ProjectStatus, ProjectSupportType } from '../../shared/api/contracts';

export const projectStatusLabels: Record<ProjectStatus, string> = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Em desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
};

export const projectSupportTypeLabels: Record<ProjectSupportType, string> = {
    apoio_tecnico: 'Apoio técnico',
    documentacao: 'Documentação',
    revisao: 'Revisão',
    divulgacao: 'Divulgação',
    mentoria: 'Mentoria',
};

export function formatProjectDate(value: string | null) {
    if (!value) {
        return 'Atualização não informada';
    }

    return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}
