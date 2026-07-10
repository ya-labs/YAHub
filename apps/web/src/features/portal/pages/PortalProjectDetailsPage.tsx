import { useParams } from 'react-router-dom';

export function PortalProjectDetailsPage() {
    const { slug } = useParams();

    return (
        <section>
            <h1>Projeto: {slug}</h1>
            <p>Detalhes públicos do projeto em construção.</p>
        </section>
    );
}
