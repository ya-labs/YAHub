import { Link } from 'react-router-dom';
import type { ProjectDetails, ProjectStatus } from '../../../shared/api/contracts';
import { useAdminMembers, useAdminProjects } from '../../../shared/api/hooks';

const projectStatusLabels: Record<ProjectStatus, string> = {
    ideia: 'Ideia',
    planejamento: 'Planejamento',
    desenvolvimento: 'Desenvolvimento',
    ativo: 'Ativo',
    pausado: 'Pausado',
    arquivado: 'Arquivado',
};

function countByStatus(projects: ProjectDetails[]) {
    return projects.reduce<Partial<Record<ProjectStatus, number>>>((statusTotals, project) => {
        statusTotals[project.status] = (statusTotals[project.status] ?? 0) + 1;

        return statusTotals;
    }, {});
}

export function AdminDashboardPage() {
    const projectsState = useAdminProjects();
    const membersState = useAdminMembers();
    const isLoading = projectsState.isLoading || membersState.isLoading;
    const error = projectsState.error ?? membersState.error;
    const projects = projectsState.data ?? [];
    const members = membersState.data ?? [];
    const visibleProjects = projects.filter((project) => project.visibility === 'publico').length;
    const hiddenProjects = projects.filter((project) => project.visibility === 'oculto').length;
    const featuredProjects = projects.filter((project) => project.featured).length;
    const projectsWithoutDocs = projects.filter((project) => project.documentationUrl === null).length;
    const membersWithoutBio = members.filter((member) => member.bio === null).length;
    const statusTotals = countByStatus(projects);
    const latestProjects = [...projects]
        .sort((firstProject, secondProject) => firstProject.displayOrder - secondProject.displayOrder)
        .slice(0, 3);

    return (
        <main className="admin-dashboard">
            <section className="admin-dashboard__hero">
                <div>
                    <p className="portal-kicker">Painel administrativo</p>
                    <h1>Conteúdo do YAHub</h1>
                    <p>
                        Acompanhe os cadastros mockados da V1 e acesse os fluxos locais de manutenção de projetos e
                        membros.
                    </p>
                </div>

                <div className="admin-dashboard__actions" aria-label="Ações principais">
                    <Link className="portal-button" to="/admin/projetos">
                        Gerenciar projetos
                    </Link>
                    <Link className="portal-link" to="/admin/membros">
                        Gerenciar membros
                    </Link>
                </div>
            </section>

            {isLoading ? <p>Carregando dados administrativos...</p> : null}
            {error ? <p role="alert">{error}</p> : null}

            {!isLoading && !error ? (
                <>
                    <section className="admin-dashboard__stats" aria-label="Resumo dos cadastros">
                        <article className="portal-stat">
                            <strong>{projects.length}</strong>
                            <span>Projetos cadastrados</span>
                        </article>

                        <article className="portal-stat">
                            <strong>{members.length}</strong>
                            <span>Membros cadastrados</span>
                        </article>

                        <article className="portal-stat">
                            <strong>{featuredProjects}</strong>
                            <span>Projetos em destaque</span>
                        </article>

                        <article className="portal-stat">
                            <strong>{visibleProjects}</strong>
                            <span>Projetos visíveis no portal</span>
                        </article>
                    </section>

                    <section className="admin-dashboard__grid">
                        <article className="portal-section">
                            <div className="portal-section__header">
                                <div>
                                    <p className="portal-kicker">Operação</p>
                                    <h2>Status dos projetos</h2>
                                </div>
                            </div>

                            {projects.length === 0 ? (
                                <p className="portal-empty">Nenhum projeto administrativo cadastrado.</p>
                            ) : (
                                <ul className="admin-dashboard__list">
                                    {Object.entries(statusTotals).map(([status, total]) => (
                                        <li key={status}>
                                            <span>{projectStatusLabels[status as ProjectStatus]}</span>
                                            <strong>{total}</strong>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>

                        <article className="portal-section">
                            <div className="portal-section__header">
                                <div>
                                    <p className="portal-kicker">Atenção</p>
                                    <h2>Pendências locais</h2>
                                </div>
                            </div>

                            <ul className="admin-dashboard__list">
                                <li>
                                    <span>Projetos ocultos</span>
                                    <strong>{hiddenProjects}</strong>
                                </li>
                                <li>
                                    <span>Projetos sem documentação</span>
                                    <strong>{projectsWithoutDocs}</strong>
                                </li>
                                <li>
                                    <span>Membros sem bio</span>
                                    <strong>{membersWithoutBio}</strong>
                                </li>
                            </ul>
                        </article>

                        <article className="portal-section">
                            <div className="portal-section__header">
                                <div>
                                    <p className="portal-kicker">Ordem pública</p>
                                    <h2>Próximos projetos exibidos</h2>
                                </div>
                            </div>

                            {latestProjects.length === 0 ? (
                                <p className="portal-empty">Nenhum projeto disponível para ordenação.</p>
                            ) : (
                                <ol className="admin-dashboard__ordered-list">
                                    {latestProjects.map((project) => (
                                        <li key={project.id}>
                                            <strong>{project.displayName}</strong>
                                            <span>{projectStatusLabels[project.status]}</span>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </article>

                        <article className="portal-section">
                            <div className="portal-section__header">
                                <div>
                                    <p className="portal-kicker">Integrações</p>
                                    <h2>Ações indisponíveis</h2>
                                </div>
                            </div>

                            <p className="portal-section__note">
                                Autenticação real, API administrativa, upload, Spotifolio e descoberta de repositórios
                                seguem fora deste recorte.
                            </p>
                        </article>
                    </section>
                </>
            ) : null}
        </main>
    );
}
