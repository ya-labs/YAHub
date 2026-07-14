import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ProjectDetails } from '../../../shared/api/contracts';
import { yahubApi } from '../../../shared/api/yahubApi';
import { DataState } from '../../../shared/components/DataState';
import type { AsyncDataState } from '../../../shared/hooks/useAsyncData';

const categoryLabels = {
    produto: 'Produto',
    ecossistema: 'Ecossistema',
} as const;

const statusLabels = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
} as const;

export function AdminProjectsPage() {
    const location = useLocation();
    const [projectsState, setProjectsState] = useState<AsyncDataState<ProjectDetails[]>>({
        data: null,
        error: null,
        isLoading: true,
    });
    const [feedback, setFeedback] = useState<string | null>(
        typeof location.state?.feedback === 'string' ? location.state.feedback : null,
    );
    const projects = useMemo(() => projectsState.data ?? [], [projectsState.data]);
    const orderedProjects = useMemo(
        () => [...projects].sort((first, second) => first.displayOrder - second.displayOrder),
        [projects],
    );

    const loadProjects = useCallback(async () => {
        setProjectsState((currentState) => ({ ...currentState, error: null, isLoading: true }));

        try {
            const data = await yahubApi.admin.projects.list();
            setProjectsState({ data, error: null, isLoading: false });
        } catch (error: unknown) {
            setProjectsState({
                data: null,
                error: error instanceof Error ? error.message : 'Não foi possível carregar os projetos.',
                isLoading: false,
            });
        }
    }, []);

    useEffect(() => {
        void loadProjects();
    }, [loadProjects]);

    async function handleRemove(project: ProjectDetails) {
        try {
            await yahubApi.admin.projects.remove(project.id);
            setFeedback(`Projeto ${project.displayName} removido localmente.`);
            await loadProjects();
        } catch (error: unknown) {
            setProjectsState((currentState) => ({
                ...currentState,
                error: error instanceof Error ? error.message : 'Não foi possível remover o projeto.',
            }));
        }
    }

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>Projetos</h1>
                    <p>Gerencie os projetos exibidos no portal público da YA LABS com dados mockados da V1.</p>
                </div>

                <Link className="portal-button admin-link-action" to="/admin/projetos/novo">
                    <span>Novo projeto</span>
                    <span aria-hidden="true">→</span>
                </Link>
            </section>

            {feedback ? <p className="admin-feedback">{feedback}</p> : null}

            <DataState {...projectsState} emptyMessage="Nenhum projeto cadastrado.">
                {() => (
                    <section className="admin-page__content">
                        <section className="admin-dashboard__stats" aria-label="Resumo administrativo de projetos">
                            <article className="portal-stat">
                                <strong>{projects.length}</strong>
                                <span>Projetos cadastrados</span>
                            </article>
                            <article className="portal-stat">
                                <strong>{projects.filter((project) => project.visibility === 'publico').length}</strong>
                                <span>Visíveis no portal</span>
                            </article>
                            <article className="portal-stat">
                                <strong>{projects.filter((project) => project.featured).length}</strong>
                                <span>Em destaque</span>
                            </article>
                            <article className="portal-stat">
                                <strong>
                                    {projects.filter((project) => project.documentationUrl === null).length}
                                </strong>
                                <span>Sem documentação</span>
                            </article>
                        </section>

                        <ul className="admin-list" aria-label="Projetos administrativos">
                            {orderedProjects.map((project) => (
                                <li className="admin-list__item" key={project.id}>
                                    <article>
                                        <header className="admin-list__header">
                                            <div>
                                                <p className="portal-kicker">{categoryLabels[project.category]}</p>
                                                <h2>{project.displayName}</h2>
                                            </div>
                                            <span className="admin-list__badge">{statusLabels[project.status]}</span>
                                        </header>

                                        <p>{project.shortDescription}</p>

                                        <dl className="admin-list__details">
                                            <div>
                                                <dt>Repositório</dt>
                                                <dd>
                                                    {project.githubOwner}/{project.githubName}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Linguagem</dt>
                                                <dd>{project.primaryLanguage ?? 'Não informada'}</dd>
                                            </div>
                                            <div>
                                                <dt>Ordem</dt>
                                                <dd>{project.displayOrder}</dd>
                                            </div>
                                            <div>
                                                <dt>Visibilidade</dt>
                                                <dd>{project.visibility === 'publico' ? 'Público' : 'Oculto'}</dd>
                                            </div>
                                        </dl>

                                        <footer className="admin-list__footer">
                                            <span>{project.featured ? 'Exibido em destaque' : 'Sem destaque'}</span>
                                            <div
                                                className="admin-list__actions"
                                                aria-label={`Ações de ${project.displayName}`}
                                            >
                                                <Link
                                                    className="admin-link-action"
                                                    to={`/admin/projetos/${project.id}/editar`}
                                                >
                                                    <span>Editar</span>
                                                    <span aria-hidden="true">→</span>
                                                </Link>
                                                <button type="button" onClick={() => void handleRemove(project)}>
                                                    Remover
                                                </button>
                                            </div>
                                        </footer>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </DataState>
        </main>
    );
}
