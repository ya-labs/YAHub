import { Link } from 'react-router-dom';
import type { ProjectSummary } from '../../../shared/api/contracts';
import { DataState } from '../../../shared/components/DataState';
import { useProjects } from '../../../shared/api/hooks';
import { formatProjectDate, projectStatusLabels, projectSupportTypeLabels } from '../projectPresentation';

type ProjectGroup = {
    id: string;
    title: string;
    kicker: string;
    emptyMessage: string;
    projects: ProjectSummary[];
    note?: string;
};

function ProjectCard({ project }: { project: ProjectSummary }) {
    const supportTypes = project.supportTypes ?? [];

    return (
        <article className="portal-card">
            <div className="portal-card__header">
                <p className="portal-kicker">{projectStatusLabels[project.status]}</p>
                <h3>{project.displayName}</h3>
            </div>

            <p>{project.shortDescription}</p>

            <div className="portal-card__meta">
                <span>
                    {project.affiliation === 'orientado'
                        ? `Autor: ${project.authorDisplayName ?? 'Autor não informado'}`
                        : `Linguagem: ${project.primaryLanguage ?? 'Não informada'}`}
                </span>
                <span>{formatProjectDate(project.updatedAt)}</span>
            </div>

            {supportTypes.length > 0 ? (
                <ul className="portal-tags" aria-label={`Apoios de ${project.displayName}`}>
                    {supportTypes.map((supportType) => (
                        <li key={supportType}>{projectSupportTypeLabels[supportType]}</li>
                    ))}
                </ul>
            ) : null}

            <Link className="portal-link" to={`/portal/projetos/${project.slug}`}>
                Ver projeto
            </Link>
        </article>
    );
}

function ProjectGroupSection({ group }: { group: ProjectGroup }) {
    return (
        <section className="portal-section" aria-labelledby={group.id}>
            <div className="portal-section__header">
                <div>
                    <p className="portal-kicker">{group.kicker}</p>
                    <h2 id={group.id}>{group.title}</h2>
                </div>
            </div>

            {group.note ? <p className="portal-section__note">{group.note}</p> : null}

            {group.projects.length > 0 ? (
                <div className="portal-grid">
                    {group.projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            ) : (
                <p className="portal-empty">{group.emptyMessage}</p>
            )}
        </section>
    );
}

function getProjectGroups(projects: ProjectSummary[]): ProjectGroup[] {
    return [
        {
            id: 'portal-products',
            title: 'Produtos',
            kicker: 'Produtos YA LABS',
            emptyMessage: 'Nenhum produto oficial cadastrado.',
            projects: projects.filter((project) => project.category === 'produto' && project.affiliation === 'oficial'),
        },
        {
            id: 'portal-ecosystem',
            title: 'Ecossistema',
            kicker: 'Projetos de suporte',
            emptyMessage: 'Nenhum projeto de ecossistema cadastrado.',
            projects: projects.filter((project) => project.category === 'ecossistema' && project.affiliation === 'oficial'),
        },
        {
            id: 'portal-guided',
            title: 'Projetos orientados',
            kicker: 'Apoio YA LABS',
            emptyMessage: 'Nenhum projeto orientado cadastrado.',
            note:
                'Projetos orientados pertencem aos seus autores. A YA LABS atua com apoio técnico, mentoria, revisão, documentação ou divulgação conforme o contexto.',
            projects: projects.filter((project) => project.affiliation === 'orientado'),
        },
    ];
}

export function PortalProjectsPage() {
    const projectsState = useProjects();

    return (
        <div className="portal-dashboard">
            <section className="portal-section">
                <p className="portal-kicker">Portal público</p>
                <h1>Projetos</h1>
                <p className="portal-section__note">
                    Explore produtos oficiais, projetos de ecossistema e iniciativas orientadas pela YA LABS.
                </p>
            </section>

            <DataState {...projectsState} emptyMessage="Nenhum projeto público encontrado.">
                {(projects) => (
                    <>
                        {getProjectGroups(projects).map((group) => (
                            <ProjectGroupSection key={group.id} group={group} />
                        ))}
                    </>
                )}
            </DataState>
        </div>
    );
}
