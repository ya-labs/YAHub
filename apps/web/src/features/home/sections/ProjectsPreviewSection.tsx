import { DataState } from '../../../shared/components/DataState';
import { useProjects } from '../../../shared/api/hooks';

export function ProjectsPreviewSection() {
    const projectsState = useProjects();

    return (
        <section id="projetos">
            <h2>Preview dos projetos</h2>
            <DataState {...projectsState} emptyMessage="Nenhum projeto em destaque encontrado.">
                {(projects) => (
                    <ul>
                        {projects
                            .filter((project) => project.featured)
                            .map((project) => (
                                <li key={project.id}>
                                    <strong>{project.displayName}</strong>
                                    <p>{project.shortDescription}</p>
                                </li>
                            ))}
                    </ul>
                )}
            </DataState>
        </section>
    );
}
