import { DataState } from '../../../shared/components/DataState';
import { useAdminMembers } from '../../../shared/api/hooks';

export function AdminMembersPage() {
    const membersState = useAdminMembers();

    return (
        <main>
            <h1>Membros</h1>
            <p>Gerencie os membros apresentados no portal público da YA LABS.</p>

            <DataState {...membersState} emptyMessage="Nenhum membro cadastrado.">
                {(members) => (
                    <section>
                        <ul>
                            {members.map((member) => (
                                <li key={member.id}>
                                    <strong>{member.name}</strong>
                                    <small>{member.role}</small>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </DataState>
        </main>
    );
}
