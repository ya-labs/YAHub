import { Link, useParams } from 'react-router-dom';
import type { MemberDetails, ProjectSummary } from '../../../shared/api/contracts';
import { DataState } from '../../../shared/components/DataState';
import { useMemberDetails, useProjects } from '../../../shared/api/hooks';
import type { AsyncDataState } from '../../../shared/hooks/useAsyncData';

function getRelatedProjects(member: MemberDetails, projects: ProjectSummary[]): ProjectSummary[] {
    return member.projectSlugs
        .map((projectSlug) => projects.find((project) => project.slug === projectSlug))
        .filter((project): project is ProjectSummary => Boolean(project));
}

function RelatedProjects({
    member,
    projectsState,
}: {
    member: MemberDetails;
    projectsState: AsyncDataState<ProjectSummary[]>;
}) {
    return (
        <DataState {...projectsState} emptyMessage="Nenhum projeto relacionado disponível para este membro.">
            {(projects) => {
                const relatedProjects = getRelatedProjects(member, projects);

                return relatedProjects.length > 0 ? (
                    <div className="portal-grid portal-grid--compact">
                        {relatedProjects.map((project) => (
                            <article className="portal-card" key={project.id}>
                                <p className="portal-kicker">
                                    {project.affiliation === 'orientado' ? 'Projeto orientado' : 'Projeto oficial'}
                                </p>
                                <h3>{project.displayName}</h3>
                                <p>{project.shortDescription}</p>
                                <Link className="portal-link" to={`/portal/projetos/${project.slug}`}>
                                    Ver projeto
                                </Link>
                            </article>
                        ))}
                    </div>
                ) : (
                    <p className="portal-empty">Nenhum projeto relacionado encontrado para este membro.</p>
                );
            }}
        </DataState>
    );
}

export function PortalMemberDetailsPage() {
    const { slug } = useParams();
    const memberState = useMemberDetails(slug);
    const projectsState = useProjects();

    return (
        <section className="portal-section">
            <p className="portal-kicker">Membro público</p>
            <DataState {...memberState} emptyMessage="Membro não encontrado.">
                {(member) => (
                    <article>
                        <div className="portal-section__header">
                            <div>
                                <p className="portal-kicker">{member.role}</p>
                                <h2>{member.name}</h2>
                            </div>
                        </div>

                        {member.bio ? <p className="portal-section__note">{member.bio}</p> : null}

                        <div className="portal-grid portal-grid--compact">
                            <div className="portal-card">
                                <h3>Responsabilidades</h3>
                                {member.responsibilities.length > 0 ? (
                                    <ul className="portal-tags" aria-label={`Responsabilidades de ${member.name}`}>
                                        {member.responsibilities.map((responsibility) => (
                                            <li key={responsibility}>{responsibility}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Responsabilidades públicas ainda não informadas.</p>
                                )}
                            </div>

                            <div className="portal-card">
                                <h3>Links públicos</h3>
                                {member.links.length > 0 ? (
                                    <ul>
                                        {member.links.map((link) => (
                                            <li key={link.url}>
                                                <a
                                                    className="portal-link"
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Nenhum link público cadastrado.</p>
                                )}
                                {member.spotifolioUsername ? <p>Spotifolio: @{member.spotifolioUsername}</p> : null}
                            </div>
                        </div>

                        <h3>Projetos relacionados</h3>
                        <RelatedProjects member={member} projectsState={projectsState} />
                    </article>
                )}
            </DataState>
        </section>
    );
}
