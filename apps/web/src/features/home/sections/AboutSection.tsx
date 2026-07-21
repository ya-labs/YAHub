export function AboutSection() {
    const pillars = [
        {
            index: '01',
            action: 'construir',
            title: 'Desenvolvimento',
            description: 'Código limpo, modular e testável.',
            className: 'home-about__capability--development',
        },
        {
            index: '02',
            action: 'liberar',
            title: 'Automação',
            description: 'Eliminamos o repetitivo para liberar o que realmente importa.',
            className: 'home-about__capability--automation',
        },
        {
            index: '03',
            action: 'registrar',
            title: 'Documentação',
            description: 'Registramos o essencial para garantir clareza, uso e evolução.',
            className: 'home-about__capability--documentation',
        },
        {
            index: '04',
            action: 'compartilhar',
            title: 'Aprendizado',
            description: 'Compartilhamos conhecimento e incentivamos a prática.',
            className: 'home-about__capability--learning',
        },
    ];

    return (
        <section className="home-chapter home-about" id="organizacao" aria-labelledby="organizacao-title">
            <div className="home-chapter__frame home-about__frame">
                <header className="home-about__intro">
                    <div>
                        <p className="home-command">ya@hub:~$ sobre</p>
                        <h2 id="organizacao-title">Construímos como laboratório.</h2>
                    </div>
                    <p className="home-about__lead">
                        YA LABS é um laboratório independente de software. Construímos, automatizamos e documentamos
                        soluções para problemas reais, com clareza e evolução contínua.
                    </p>
                </header>

                <div className="home-about__composition">
                    <aside className="home-about__mission" aria-label="Missão da YA LABS">
                        <div className="home-about__mission-signal" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </div>
                        <p className="home-about__mission-label">o princípio que orienta cada entrega</p>
                        <p className="home-about__mission-copy">
                            Simplificar o complexo
                            <span>para potencializar pessoas.</span>
                        </p>
                        <p className="home-about__mission-note">
                            Engenharia útil, documentação viva e espaço para aprender fazendo.
                        </p>
                    </aside>

                    <ul className="home-about__pillars" aria-label="Áreas de atuação da YA LABS">
                        {pillars.map((pillar) => (
                            <li className={pillar.className} key={pillar.title}>
                                <div className="home-about__capability-meta">
                                    <span>{pillar.index}</span>
                                    <span>{pillar.action}</span>
                                </div>
                                <div>
                                    <h3>{pillar.title}</h3>
                                    <p>{pillar.description}</p>
                                </div>
                                <span className="home-about__capability-signal" aria-hidden="true">
                                    <i />
                                    <i />
                                    <i />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <dl className="home-about__concepts" aria-label="Separação conceitual da Home">
                    <div>
                        <dt>YA LABS</dt>
                        <dd>constrói o laboratório e o ecossistema.</dd>
                    </div>
                    <div>
                        <dt>YAHub</dt>
                        <dd>conecta tudo em uma central de acesso.</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
