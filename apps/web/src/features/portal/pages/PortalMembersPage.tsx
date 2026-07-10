import { DataState } from '../../../shared/components/DataState';
import { useMembers } from '../../../shared/api/hooks';

export function PortalMembersPage() {
    const membersState = useMembers();

    return (
        <section>
            <h1>Membros</h1>
            <p>Listagem pública de membros do YAHub.</p>

            <DataState {...membersState} emptyMessage="Nenhum membro público encontrado.">
                {(members) => (
                    <ul>
                        {members.map((member) => (
                            <li key={member.id}>
                                <strong>{member.name}</strong>
                                <p>{member.role}</p>
                                <small>{member.responsibilities.join(', ')}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </DataState>
        </section>
    );
}
