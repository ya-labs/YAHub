export function AboutSection() {
    const pillars = [
        {
            title: 'Desenvolvimento',
            description: 'Código limpo, modular e testável.',
        },
        {
            title: 'Automação',
            description: 'Eliminamos o repetitivo para liberar o que realmente importa.',
        },
        {
            title: 'Documentação',
            description: 'Registramos o essencial para garantir clareza, uso e evolução.',
        },
        {
            title: 'Aprendizado',
            description: 'Compartilhamos conhecimento e incentivamos a prática.',
        },
    ];

    return (
        <section className="home-section home-section--about" id="organizacao" aria-labelledby="organizacao-title">
            <div className="home-section__intro">
                <div className="home-terminal-lines" aria-label="Comandos sobre a organização">
                    <p>ya@hub:~$ sobre</p>
                </div>
                <h2 id="organizacao-title">Construímos como laboratório.</h2>
                <p>
                    YA LABS é um laboratório independente de software. Construímos, automatizamos e documentamos
                    soluções para resolver problemas reais com clareza, eficiência e evolução contínua.
                </p>
            </div>

            <ul className="home-pillar-grid" aria-label="Áreas de atuação da YA LABS">
                {pillars.map((pillar) => (
                    <li key={pillar.title}>
                        <h3>{pillar.title}</h3>
                        <p>{pillar.description}</p>
                    </li>
                ))}
            </ul>

            <aside className="home-mission" aria-label="Missão da YA LABS">
                <p>nossa missão:</p>
                <p>simplificar o complexo. potencializar pessoas.</p>
            </aside>

            <dl className="home-concept-list" aria-label="Separação conceitual da Home">
                <div>
                    <dt>YA LABS</dt>
                    <dd>organização, laboratório e ecossistema apresentado pelo portal.</dd>
                </div>
                <div>
                    <dt>YAHub</dt>
                    <dd>portal, interface e central de acesso da organização.</dd>
                </div>
            </dl>
        </section>
    );
}
