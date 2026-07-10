import { DataState } from '../../../shared/components/DataState';
import { useProjects } from '../../../shared/api/hooks';

export function PortalProjectsPage() {
    const projectsState = useProjects();

    return (
        <section>
            <h1>Projetos</h1>
            <p>Listagem pública de projetos do YAHub.</p>

            <DataState {...projectsState} emptyMessage="Nenhum projeto público encontrado.">
                {(projects) => (
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id}>
                                <strong>{project.displayName}</strong>
                                <p>{project.shortDescription}</p>
                                <small>
                                    {project.category} · {project.affiliation} · {project.status}
                                </small>
                            </li>
                        ))}
                    </ul>
                )}
            </DataState>
        </section>
    );
}
