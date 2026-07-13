import { DataState } from '../../../shared/components/DataState';
import { useAdminMembers } from '../../../shared/api/hooks';

export function AdminMembersPage() {
    const membersState = useAdminMembers();
    const members = membersState.data ?? [];

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>Membros</h1>
                    <p>Consulte as pessoas apresentadas no portal público e os vínculos operacionais mantidos localmente.</p>
                </div>
            </section>

            <DataState {...membersState} emptyMessage="Nenhum membro cadastrado.">
                {() => (
                    <section className="admin-page__content">
                        <section className="admin-dashboard__stats" aria-label="Resumo administrativo de membros">
                            <article className="portal-stat">
                                <strong>{members.length}</strong>
                                <span>Membros cadastrados</span>
                            </article>
                            <article className="portal-stat">
                                <strong>{members.filter((member) => member.githubUsername).length}</strong>
                                <span>Com perfil GitHub</span>
                            </article>
                            <article className="portal-stat">
                                <strong>{members.filter((member) => member.projectSlugs.length > 0).length}</strong>
                                <span>Com projetos associados</span>
                            </article>
                        </section>

                        <ul className="admin-list" aria-label="Membros administrativos">
                            {members.map((member) => (
                                <li className="admin-list__item" key={member.id}>
                                    <article>
                                        <header className="admin-list__header">
                                            <div>
                                                <p className="portal-kicker">Membro</p>
                                                <h2>{member.name}</h2>
                                            </div>
                                            <span className="admin-list__badge">{member.role}</span>
                                        </header>

                                        <p>{member.bio ?? 'Biografia ainda não informada.'}</p>

                                        <dl className="admin-list__details">
                                            <div>
                                                <dt>GitHub</dt>
                                                <dd>{member.githubUsername ? `@${member.githubUsername}` : 'Não informado'}</dd>
                                            </div>
                                            <div>
                                                <dt>Spotifolio</dt>
                                                <dd>{member.spotifolioUsername ? `@${member.spotifolioUsername}` : 'Não informado'}</dd>
                                            </div>
                                            <div>
                                                <dt>Projetos</dt>
                                                <dd>{member.projectSlugs.length || 'Nenhum associado'}</dd>
                                            </div>
                                            <div>
                                                <dt>Links externos</dt>
                                                <dd>{member.links.length || 'Nenhum informado'}</dd>
                                            </div>
                                        </dl>

                                        <div className="admin-member-details">
                                            <div>
                                                <strong>Responsabilidades</strong>
                                                <ul className="admin-list__tags">
                                                    {member.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
                                                </ul>
                                            </div>
                                            <div>
                                                <strong>Projetos associados</strong>
                                                <ul className="admin-list__tags">
                                                    {member.projectSlugs.map((projectSlug) => <li key={projectSlug}>{projectSlug}</li>)}
                                                </ul>
                                            </div>
                                        </div>

                                        <footer className="admin-list__footer">
                                            <span>Manutenção de membros será liberada na próxima etapa.</span>
                                            <div className="admin-list__actions" aria-label={`Ações de ${member.name}`}>
                                                <button type="button" disabled>Editar</button>
                                                <button type="button" disabled>Remover</button>
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
