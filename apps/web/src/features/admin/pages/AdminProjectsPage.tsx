import { DataState } from '../../../shared/components/DataState';
import type { ProjectAffiliation, ProjectCategory, ProjectStatus, ProjectVisibility } from '../../../shared/api/contracts';
import { useAdminProjects } from '../../../shared/api/hooks';

const categoryLabels: Record<ProjectCategory, string> = {
    produto: 'Produto',
    ecossistema: 'Ecossistema',
};

const affiliationLabels: Record<ProjectAffiliation, string> = {
    oficial: 'Oficial',
    orientado: 'Orientado',
};

const statusLabels: Record<ProjectStatus, string> = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
};

const visibilityLabels: Record<ProjectVisibility, string> = {
    publico: 'Público',
    oculto: 'Oculto',
};

export function AdminProjectsPage() {
    const projectsState = useAdminProjects();

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>Projetos</h1>
                    <p>
                        Gerencie os projetos exibidos no portal público da YA LABS, com dados mockados alinhados aos
                        contratos administrativos da V1.
                    </p>
                </div>

                <button type="button" className="portal-button" disabled>
                    Novo projeto
                </button>
            </section>

            <DataState {...projectsState} emptyMessage="Nenhum projeto cadastrado.">
                {(projects) => (
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
                            {projects.map((project) => (
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
                                                <dt>Vínculo</dt>
                                                <dd>{affiliationLabels[project.affiliation]}</dd>
                                            </div>
                                            <div>
                                                <dt>Visibilidade</dt>
                                                <dd>{visibilityLabels[project.visibility]}</dd>
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
                                                <dt>Repositório</dt>
                                                <dd>
                                                    <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
                                                        {project.githubOwner}/{project.githubName}
                                                    </a>
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Documentação</dt>
                                                <dd>
                                                    {project.documentationUrl ? (
                                                        <a
                                                            href={project.documentationUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Abrir documentação
                                                        </a>
                                                    ) : (
                                                        'Pendente'
                                                    )}
                                                </dd>
                                            </div>
                                        </dl>

                                        <footer className="admin-list__footer">
                                            <span>{project.featured ? 'Exibido em destaque' : 'Sem destaque'}</span>

                                            <div className="admin-list__actions" aria-label={`Ações de ${project.displayName}`}>
                                                <button type="button" disabled>
                                                    Editar
                                                </button>
                                                <button type="button" disabled>
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
