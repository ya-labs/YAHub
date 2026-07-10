import { useParams } from 'react-router-dom';
import { DataState } from '../../../shared/components/DataState';
import { useProjectDetails } from '../../../shared/api/hooks';

export function PortalProjectDetailsPage() {
    const { slug } = useParams();
    const projectState = useProjectDetails(slug);

    return (
        <section>
            <h1>Projeto: {slug}</h1>
            <DataState {...projectState} emptyMessage="Projeto não encontrado.">
                {(project) => (
                    <article>
                        <h2>{project.displayName}</h2>
                        <p>{project.fullDescription}</p>
                        <p>
                            <strong>Status:</strong> {project.status}
                        </p>
                        <p>
                            <strong>Tecnologias:</strong> {project.technologies.join(', ')}
                        </p>
                        <a href={project.repositoryUrl}>Repositório</a>
                    </article>
                )}
            </DataState>
        </section>
    );
}
