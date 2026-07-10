import { useParams } from 'react-router-dom';
import { DataState } from '../../../shared/components/DataState';
import { useMemberDetails } from '../../../shared/api/hooks';

export function PortalMemberDetailsPage() {
    const { slug } = useParams();
    const memberState = useMemberDetails(slug);

    return (
        <section>
            <h1>Membro: {slug}</h1>
            <DataState {...memberState} emptyMessage="Membro não encontrado.">
                {(member) => (
                    <article>
                        <h2>{member.name}</h2>
                        <p>{member.role}</p>
                        {member.bio ? <p>{member.bio}</p> : null}
                        <ul>
                            {member.responsibilities.map((responsibility) => (
                                <li key={responsibility}>{responsibility}</li>
                            ))}
                        </ul>
                    </article>
                )}
            </DataState>
        </section>
    );
}
