import { Link } from 'react-router-dom';
import type { MemberSummary } from '../../../shared/api/contracts';
import { DataState } from '../../../shared/components/DataState';
import { useMembers } from '../../../shared/api/hooks';

function MemberCard({ member }: { member: MemberSummary }) {
    return (
        <article className="portal-card">
            <div className="portal-card__header">
                <p className="portal-kicker">{member.role}</p>
                <h3>{member.name}</h3>
            </div>

            {member.responsibilities.length > 0 ? (
                <ul className="portal-tags" aria-label={`Responsabilidades de ${member.name}`}>
                    {member.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                    ))}
                </ul>
            ) : (
                <p>Responsabilidades públicas ainda não informadas.</p>
            )}

            <div className="portal-card__meta">
                <span>
                    {member.projectSlugs.length === 1
                        ? '1 projeto relacionado'
                        : `${member.projectSlugs.length} projetos relacionados`}
                </span>
                {member.githubUsername ? <span>GitHub: @{member.githubUsername}</span> : null}
            </div>

            <Link className="portal-link" to={`/portal/membros/${member.slug}`}>
                Ver detalhes
            </Link>
        </article>
    );
}

export function PortalMembersPage() {
    const membersState = useMembers();

    return (
        <div className="portal-dashboard">
            <section className="portal-section">
                <p className="portal-kicker">Portal público</p>
                <h1>Membros</h1>
                <p className="portal-section__note">
                    Conheça as pessoas disponíveis no contrato público do YAHub e suas responsabilidades atuais.
                </p>
            </section>

            <DataState {...membersState} emptyMessage="Nenhum membro público encontrado.">
                {(members) => (
                    <section className="portal-section" aria-labelledby="portal-members-list">
                        <div className="portal-section__header">
                            <div>
                                <p className="portal-kicker">Equipe</p>
                                <h2 id="portal-members-list">Membros disponíveis</h2>
                            </div>
                        </div>

                        <div className="portal-grid">
                            {members.map((member) => (
                                <MemberCard key={member.id} member={member} />
                            ))}
                        </div>
                    </section>
                )}
            </DataState>
        </div>
    );
}
