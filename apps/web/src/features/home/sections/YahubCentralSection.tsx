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
        <section id="yahub" aria-labelledby="yahub-title">
            <h2 id="yahub-title">YAHub: a porta de entrada da YA LABS</h2>
            <p>
                YAHub conecta pessoas, projetos e conhecimento. Centralizamos projetos, membros, documentação e
                atividade em um só lugar.
            </p>

            <ul>
                {yahubAreas.map((area) => (
                    <li key={area.title}>
                        <h3>{area.title}</h3>
                        <p>{area.description}</p>
                    </li>
                ))}
            </ul>

            <nav aria-label="Ações da Central YAHub">
                <a href="/portal">Acessar o portal</a>
                <a href="/portal/projetos">Ver projetos</a>
                <a href="/portal/docs">Acessar documentação</a>
            </nav>
        </section>
    );
}
