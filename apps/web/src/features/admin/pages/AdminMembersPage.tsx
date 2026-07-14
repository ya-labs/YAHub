import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { MemberDetails } from '../../../shared/api/contracts';
import { yahubApi } from '../../../shared/api/yahubApi';
import { DataState } from '../../../shared/components/DataState';
import type { AsyncDataState } from '../../../shared/hooks/useAsyncData';

export function AdminMembersPage() {
    const location = useLocation();
    const [membersState, setMembersState] = useState<AsyncDataState<MemberDetails[]>>({
        data: null,
        error: null,
        isLoading: true,
    });
    const [feedback, setFeedback] = useState<string | null>(
        typeof location.state?.feedback === 'string' ? location.state.feedback : null,
    );
    const members = useMemo(() => membersState.data ?? [], [membersState.data]);

    const loadMembers = useCallback(async () => {
        setMembersState((currentState) => ({ ...currentState, error: null, isLoading: true }));

        try {
            const data = await yahubApi.admin.members.list();
            setMembersState({ data, error: null, isLoading: false });
        } catch (error: unknown) {
            setMembersState({
                data: null,
                error: error instanceof Error ? error.message : 'Não foi possível carregar os membros.',
                isLoading: false,
            });
        }
    }, []);

    useEffect(() => {
        void loadMembers();
    }, [loadMembers]);

    async function handleRemove(member: MemberDetails) {
        try {
            await yahubApi.admin.members.remove(member.id);
            setFeedback(`Membro ${member.name} removido localmente.`);
            await loadMembers();
        } catch (error: unknown) {
            setMembersState((currentState) => ({
                ...currentState,
                error: error instanceof Error ? error.message : 'Não foi possível remover o membro.',
            }));
        }
    }

    return (
        <main className="admin-page">
            <section className="admin-page__header">
                <div>
                    <p className="portal-kicker">Administração</p>
                    <h1>Membros</h1>
                    <p>
                        Gerencie as pessoas apresentadas no portal público e os vínculos operacionais mantidos
                        localmente.
                    </p>
                </div>
                <Link className="portal-button admin-link-action" to="/admin/membros/novo">
                    <span>Novo membro</span>
                    <span aria-hidden="true">→</span>
                </Link>
            </section>

            {feedback ? <p className="admin-feedback">{feedback}</p> : null}

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
                                                <dd>
                                                    {member.githubUsername
                                                        ? `@${member.githubUsername}`
                                                        : 'Não informado'}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt>Spotifolio</dt>
                                                <dd>
                                                    {member.spotifolioUsername
                                                        ? `@${member.spotifolioUsername}`
                                                        : 'Não informado'}
                                                </dd>
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
                                                    {member.responsibilities.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <strong>Projetos associados</strong>
                                                <ul className="admin-list__tags">
                                                    {member.projectSlugs.map((item) => (
                                                        <li key={item}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <footer className="admin-list__footer">
                                            <span>Dados mockados, mantidos apenas nesta sessão local.</span>
                                            <div className="admin-list__actions" aria-label={`Ações de ${member.name}`}>
                                                <Link
                                                    className="admin-link-action"
                                                    to={`/admin/membros/${member.id}/editar`}
                                                >
                                                    <span>Editar</span>
                                                    <span aria-hidden="true">→</span>
                                                </Link>
                                                <button type="button" onClick={() => void handleRemove(member)}>
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
