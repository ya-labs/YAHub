import { DataState } from '../../../shared/components/DataState';
import { useActivity } from '../../../shared/api/hooks';

export function PortalActivityPage() {
    const activityState = useActivity();

    return (
        <section>
            <h2>Atividades</h2>

            <p>Confira as atividades de desenvolvimento da YA LABS.</p>

            <DataState {...activityState} emptyMessage="Nenhuma atividade pública encontrada.">
                {(activityItems) => (
                    <ul>
                        {activityItems.map((activity) => (
                            <li key={activity.id}>
                                <strong>{activity.projectName ?? 'YA LABS'}</strong>
                                <p>{activity.description}</p>
                                <time dateTime={activity.occurredAt}>
                                    {new Intl.DateTimeFormat('pt-BR').format(new Date(activity.occurredAt))}
                                </time>
                            </li>
                        ))}
                    </ul>
                )}
            </DataState>
        </section>
    );
}
