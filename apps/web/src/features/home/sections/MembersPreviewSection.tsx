import { DataState } from '../../../shared/components/DataState';
import { useMembers } from '../../../shared/api/hooks';

export function MembersPreviewSection() {
    const membersState = useMembers();

    return (
        <section id="membros">
            <h2>Preview dos membros</h2>
            <DataState {...membersState} emptyMessage="Nenhum membro em destaque encontrado.">
                {(members) => (
                    <ul>
                        {members.map((member) => (
                            <li key={member.id}>
                                <strong>{member.name}</strong>
                                <p>{member.role}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </DataState>
        </section>
    );
}
