import { Link } from 'react-router-dom';
import type { ActivityItem, MemberSummary, Organization, ProjectSummary } from '../../../shared/api/contracts';
import { useActivity, useMembers, useOrganization, useProjects } from '../../../shared/api/hooks';
import { DataState } from '../../../shared/components/DataState';
import { formatProjectDate, projectStatusLabels, projectSupportTypeLabels } from '../projectPresentation';

function formatDate(value: string | null) {
    if (!value) {
        return 'Atualização não informada';
    }

    return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function ProjectCard({ project }: { project: ProjectSummary }) {
    const supportTypes = project.supportTypes ?? [];

    return (
        <article className="portal-card">
            <div className="portal-card__header">
                <p className="portal-kicker">{projectStatusLabels[project.status]}</p>
                <h3>{project.displayName}</h3>
            </div>
            <p>{project.shortDescription}</p>

            {project.affiliation === 'orientado' ? (
                <div className="portal-card__meta">
                    <span>Autor: {project.authorDisplayName ?? 'Autor não informado'}</span>
                    <span>Projeto mantido pelo autor, com apoio da YA LABS.</span>
                </div>
            ) : (
                <div className="portal-card__meta">
                    <span>Linguagem: {project.primaryLanguage ?? 'Não informada'}</span>
                    <span>{formatProjectDate(project.updatedAt)}</span>
                </div>
            )}

            {supportTypes.length > 0 ? (
                <ul className="portal-tags" aria-label="Tipos de apoio">
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

function StatCard({ label, value }: { label: string; value: number | string }) {
    return (
        <div className="portal-stat">
            <strong>{value}</strong>
            <span>{label}</span>
        </div>
    );
}

function OrganizationSummary({ organization }: { organization: Organization }) {
    return (
        <section className="portal-hero" aria-labelledby="portal-title">
            <div className="portal-hero__content">
                <p className="portal-kicker">Portal público</p>
                <h1 id="portal-title">{organization.name}</h1>
                <p>{organization.description}</p>
                {organization.highlight ? <strong>{organization.highlight}</strong> : null}
            </div>

            <div className="portal-hero__panel" aria-label="Resumo do portal">
                <StatCard label="projetos públicos" value={organization.stats.projects} />
                <StatCard label="membros" value={organization.stats.members} />
                <Link className="portal-button" to="/portal/projetos">
                    Explorar projetos
                </Link>
            </div>
        </section>
    );
}

function ProjectsOverview({ projects }: { projects: ProjectSummary[] }) {
    const products = projects.filter((project) => project.category === 'produto' && project.affiliation === 'oficial');
    const ecosystem = projects.filter((project) => project.category === 'ecossistema' && project.affiliation === 'oficial');
    const guidedProjects = projects.filter((project) => project.affiliation === 'orientado');

    return (
        <>
            <section className="portal-section" aria-labelledby="portal-products">
                <div className="portal-section__header">
                    <div>
                        <p className="portal-kicker">Produtos YA LABS</p>
                        <h2 id="portal-products">Produtos oficiais</h2>
                    </div>
                    <Link className="portal-link" to="/portal/projetos">
                        Ver todos
                    </Link>
                </div>
                {products.length > 0 ? (
                    <div className="portal-grid">
                        {products.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <p className="portal-empty">Nenhum produto oficial cadastrado.</p>
                )}
            </section>

            <section className="portal-section" aria-labelledby="portal-ecosystem">
                <div className="portal-section__header">
                    <div>
                        <p className="portal-kicker">Ecossistema YA</p>
                        <h2 id="portal-ecosystem">Projetos de suporte</h2>
                    </div>
                    <Link className="portal-link" to="/portal/docs">
                        Ver docs
                    </Link>
                </div>
                {ecosystem.length > 0 ? (
                    <div className="portal-grid">
                        {ecosystem.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <p className="portal-empty">Nenhum projeto de ecossistema cadastrado.</p>
                )}
            </section>

            <section className="portal-section" aria-labelledby="portal-guided">
                <div className="portal-section__header">
                    <div>
                        <p className="portal-kicker">Projetos orientados</p>
                        <h2 id="portal-guided">Projetos com apoio da YA LABS</h2>
                    </div>
                    <Link className="portal-link" to="/portal/projetos">
                        Ver projetos
                    </Link>
                </div>
                <p className="portal-section__note">
                    Projetos orientados pertencem aos seus autores e são mantidos por eles. A YA LABS atua com apoio técnico,
                    mentoria, revisão, documentação ou divulgação conforme o contexto.
                </p>
                {guidedProjects.length > 0 ? (
                    <div className="portal-grid">
                        {guidedProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <p className="portal-empty">Nenhum projeto orientado cadastrado.</p>
                )}
            </section>
        </>
    );
}

function MembersOverview({ members }: { members: MemberSummary[] }) {
    return (
        <section className="portal-section" aria-labelledby="portal-members">
            <div className="portal-section__header">
                <div>
                    <p className="portal-kicker">Membros</p>
                    <h2 id="portal-members">Quem participa</h2>
                </div>
                <Link className="portal-link" to="/portal/membros">
                    Ver membros
                </Link>
            </div>

            <div className="portal-grid portal-grid--compact">
                {members.slice(0, 4).map((member) => (
                    <article className="portal-card" key={member.id}>
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                        <div className="portal-card__meta">
                            <span>{member.responsibilities.join(', ')}</span>
                        </div>
                        <Link className="portal-link" to={`/portal/membros/${member.slug}`}>
                            Ver membro
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
}

function ActivityOverview({ activityItems }: { activityItems: ActivityItem[] }) {
    return (
        <section className="portal-section" aria-labelledby="portal-activity">
            <div className="portal-section__header">
                <div>
                    <p className="portal-kicker">Atividade recente</p>
                    <h2 id="portal-activity">Movimento dos projetos</h2>
                </div>
                <Link className="portal-link" to="/portal/atividade">
                    Ver atividade
                </Link>
            </div>

            <div className="portal-timeline">
                {activityItems.slice(0, 3).map((activity) => (
                    <article className="portal-timeline__item" key={activity.id}>
                        <time dateTime={activity.occurredAt}>{formatDate(activity.occurredAt)}</time>
                        <strong>{activity.projectName ?? 'YA LABS'}</strong>
                        <p>{activity.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export function PortalHomePage() {
    const organizationState = useOrganization();
    const projectsState = useProjects();
    const membersState = useMembers();
    const activityState = useActivity();

    return (
        <div className="portal-dashboard">
            <DataState
                {...organizationState}
                emptyMessage="Não foi possível encontrar os dados da organização."
                getIsEmpty={(organization) => organization.name.trim().length === 0}
            >
                {(organization) => <OrganizationSummary organization={organization} />}
            </DataState>

            <DataState {...projectsState} emptyMessage="Nenhum projeto público encontrado.">
                {(projects) => <ProjectsOverview projects={projects} />}
            </DataState>

            <DataState {...membersState} emptyMessage="Nenhum membro público encontrado.">
                {(members) => <MembersOverview members={members} />}
            </DataState>

            <DataState {...activityState} emptyMessage="Nenhuma atividade pública encontrada.">
                {(activityItems) => <ActivityOverview activityItems={activityItems} />}
            </DataState>
        </div>
    );
}
