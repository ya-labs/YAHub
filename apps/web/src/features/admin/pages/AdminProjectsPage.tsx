import { DataState } from '../../../shared/components/DataState';
import { useAdminProjects } from '../../../shared/api/hooks';

export function AdminProjectsPage() {
    const projectsState = useAdminProjects();

    return (
        <main>
            <h1>Projetos</h1>
            <p>Gerencie os projetos exibidos no portal público da YA LABS.</p>

            <DataState {...projectsState} emptyMessage="Nenhum projeto cadastrado.">
                {(projects) => (
                    <section>
                        <ul>
                            {projects.map((project) => (
                                <li key={project.id}>
                                    <strong>{project.displayName}</strong>
                                    <small>{project.repositoryUrl}</small>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </DataState>
        </main>
    );
}
