import { Link } from 'react-router-dom';

import { ChapterSignal } from '../components/ChapterSignal';

const yahubAreas = [
    {
        title: 'Explore projetos',
        description: 'Descubra iniciativas e acompanhe seu progresso.',
        label: 'projetos',
    },
    {
        title: 'Conecte-se com membros',
        description: 'Colabore com a comunidade e amplie sua rede.',
        label: 'membros',
    },
    {
        title: 'Acesse documentação',
        description: 'Encontre guias, referências e boas práticas.',
        label: 'docs',
    },
    {
        title: 'Acompanhe a atividade',
        description: 'Veja o que está acontecendo em tempo real.',
        label: 'atividade',
    },
];

export function YahubCentralSection() {
    return (
        <section className="home-chapter home-central" id="yahub" aria-labelledby="yahub-title">
            <ChapterSignal variant="blue" />
            <div className="home-chapter__frame home-central__frame">
                <div className="home-central__intro">
                    <p className="home-command">ya@hub:~$ open portal</p>
                    <h2 id="yahub-title">YAHub: a porta de entrada da YA LABS</h2>
                    <p>
                        Depois de entender a YA LABS, o ecossistema, o fluxo e os produtos, tudo se conecta no YAHub:
                        projetos, membros, documentação e atividade em um só lugar.
                    </p>

                    <nav className="home-central__actions" aria-label="Ações da Central YAHub">
                        <Link className="home-central__primary" to="/portal">
                            Acessar o portal
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </nav>
                </div>

                <div className="home-portal-preview" aria-label="Prévia conceitual da Central YAHub">
                    <header className="home-portal-preview__header">
                        <strong>YAHub</strong>
                        <span>portal / overview</span>
                        <i aria-hidden="true" />
                    </header>

                    <div className="home-portal-preview__body">
                        <nav className="home-portal-preview__nav" aria-label="Áreas representadas na prévia do YAHub">
                            <span className="home-portal-preview__nav-active">visão geral</span>
                            {yahubAreas.map((area) => (
                                <span key={area.label}>{area.label}</span>
                            ))}
                        </nav>

                        <div className="home-portal-preview__content">
                            <div className="home-portal-preview__welcome">
                                <span>central YA LABS</span>
                                <strong>Um lugar para encontrar o que está em movimento.</strong>
                            </div>

                            <ul aria-label="Áreas conectadas pelo YAHub">
                                {yahubAreas.map((area) => (
                                    <li key={area.title}>
                                        <span aria-hidden="true">↗</span>
                                        <div>
                                            <h3>{area.title}</h3>
                                            <p>{area.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
