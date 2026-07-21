import { Link } from 'react-router-dom';

const yahubAreas = [
    {
        title: 'Explore projetos',
        description: 'Descubra iniciativas e acompanhe seu progresso.',
    },
    {
        title: 'Conecte-se com membros',
        description: 'Colabore com a comunidade e amplie sua rede.',
    },
    {
        title: 'Acesse documentação',
        description: 'Encontre guias, referências e boas práticas.',
    },
    {
        title: 'Acompanhe a atividade',
        description: 'Veja o que está acontecendo em tempo real.',
    },
];

export function YahubCentralSection() {
    return (
        <section className="home-section home-section--central" id="yahub" aria-labelledby="yahub-title">
            <div className="home-section__intro">
                <h2 id="yahub-title">YAHub: a porta de entrada da YA LABS</h2>
                <p>
                    Depois de entender a YA LABS, o ecossistema, o fluxo e os produtos, tudo se conecta no YAHub.
                </p>
                <p>
                    YAHub conecta pessoas, projetos e conhecimento. Centralizamos projetos, membros, documentação e
                    atividade em um só lugar.
                </p>
            </div>

            <ul className="home-central-grid" aria-label="Áreas conectadas pelo YAHub">
                {yahubAreas.map((area) => (
                    <li key={area.title}>
                        <h3>{area.title}</h3>
                        <p>{area.description}</p>
                    </li>
                ))}
            </ul>

            <nav className="home-central-actions" aria-label="Ações da Central YAHub">
                <Link to="/portal">Acessar o portal</Link>
                <Link to="/portal/projetos">Ver projetos</Link>
                <Link to="/portal/docs">Acessar documentação</Link>
            </nav>
        </section>
    );
}
