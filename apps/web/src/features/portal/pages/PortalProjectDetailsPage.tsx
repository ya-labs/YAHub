import { useParams } from 'react-router-dom';
import { DataState } from '../../../shared/components/DataState';
import { useProjectDetails } from '../../../shared/api/hooks';
import { formatProjectDate, projectStatusLabels, projectSupportTypeLabels } from '../projectPresentation';

export function PortalProjectDetailsPage() {
    const { slug } = useParams();
    const projectState = useProjectDetails(slug);

    return (
        <section className="portal-section">
            <p className="portal-kicker">Projeto público</p>
            <h1>Projeto: {slug}</h1>
            <DataState {...projectState} emptyMessage="Projeto não encontrado.">
                {(project) => (
                    <article>
                        <div className="portal-section__header">
                            <div>
                                <p className="portal-kicker">{projectStatusLabels[project.status]}</p>
                                <h2>{project.displayName}</h2>
                            </div>
                            <a className="portal-link" href={project.repositoryUrl}>
                                Repositório
                            </a>
                        </div>

                        <p className="portal-section__note">{project.tagline}</p>
                        <p>{project.fullDescription}</p>

                        <div className="portal-grid portal-grid--compact">
                            <div className="portal-card">
                                <h3>Visão geral</h3>
                                <div className="portal-card__meta">
                                    <span>Categoria: {project.category === 'produto' ? 'Produto' : 'Ecossistema'}</span>
                                    <span>
                                        Vínculo:{' '}
                                        {project.affiliation === 'orientado' ? 'Projeto orientado' : 'Projeto oficial'}
                                    </span>
                                    <span>Linguagem: {project.primaryLanguage ?? 'Não informada'}</span>
                                    <span>{formatProjectDate(project.updatedAt)}</span>
                                </div>
                            </div>

                            {project.affiliation === 'orientado' ? (
                                <div className="portal-card">
                                    <h3>Apoio da YA LABS</h3>
                                    <div className="portal-card__meta">
                                        <span>Autor: {project.authorDisplayName ?? 'Autor não informado'}</span>
                                        <span>Projeto mantido pelo autor, com apoio da organização.</span>
                                    </div>
                                    {(project.supportTypes ?? []).length > 0 ? (
                                        <ul className="portal-tags" aria-label="Tipos de apoio">
                                            {project.supportTypes?.map((supportType) => (
                                                <li key={supportType}>{projectSupportTypeLabels[supportType]}</li>
                                            ))}
                                        </ul>
                                    ) : null}
                                </div>
                            ) : null}
                        </div>

                        {project.technologies.length > 0 ? (
                            <>
                                <h3>Tecnologias</h3>
                                <ul className="portal-tags" aria-label="Tecnologias do projeto">
                                    {project.technologies.map((technology) => (
                                        <li key={technology}>{technology}</li>
                                    ))}
                                </ul>
                            </>
                        ) : null}

                        <h3>Links</h3>
                        <ul>
                            <li>
                                <a className="portal-link" href={project.repositoryUrl}>
                                    Repositório
                                </a>
                            </li>
                            {project.websiteUrl ? (
                                <li>
                                    <a className="portal-link" href={project.websiteUrl}>
                                        Site
                                    </a>
                                </li>
                            ) : null}
                            {project.documentationUrl ? (
                                <li>
                                    <a className="portal-link" target='_blank' href={project.documentationUrl}>
                                        Documentação
                                    </a>
                                </li>
                            ) : null}
                        </ul>

                        {project.recentActivities.length > 0 ? (
                            <>
                                <h3>Atividade recente</h3>
                                <div className="portal-timeline">
                                    {project.recentActivities.map((activity) => (
                                        <div className="portal-timeline__item" key={activity.id}>
                                            <time dateTime={activity.occurredAt}>
                                                {formatProjectDate(activity.occurredAt)}
                                            </time>
                                            <strong>{activity.description}</strong>
                                            {activity.referenceUrl ? (
                                                <a className="portal-link" href={activity.referenceUrl}>
                                                    Referência
                                                </a>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : null}
                    </article>
                )}
            </DataState>
        </section>
    );
}
