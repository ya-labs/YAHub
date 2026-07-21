const buildSteps = [
    {
        index: '01',
        title: 'Ideia',
        command: 'new idea',
        description: 'Um problema real encontra intenção e direção.',
        className: 'home-build__step--idea',
    },
    {
        index: '02',
        title: 'Documentação',
        command: 'docs init',
        description: 'Contexto e decisões deixam de depender da memória.',
        className: 'home-build__step--docs',
    },
    {
        index: '03',
        title: 'Issue',
        command: 'issue create',
        description: 'Escopo, critérios e limites tornam o trabalho claro.',
        className: 'home-build__step--issue',
    },
    {
        index: '04',
        title: 'Branch',
        command: 'git checkout -b',
        description: 'A solução evolui isolada, rastreável e testável.',
        className: 'home-build__step--branch',
    },
    {
        index: '05',
        title: 'Pull Request',
        command: 'pr open',
        description: 'Código, evidências e revisão se encontram.',
        className: 'home-build__step--pr',
    },
    {
        index: '06',
        title: 'Release',
        command: 'release create',
        description: 'O aprendizado termina em valor disponível.',
        className: 'home-build__step--release',
    },
];

export function BuildFlowSection() {
    return (
        <section className="home-chapter home-build" id="fluxo" aria-labelledby="fluxo-title">
            <div className="home-chapter__frame home-build__frame">
                <header className="home-build__intro">
                    <div>
                        <p className="home-command">yahub:~$ build --from idea</p>
                        <h2 id="fluxo-title">Como uma ideia vira produto.</h2>
                    </div>
                    <p>
                        Um fluxo colaborativo, transparente e iterativo. Da ideia à entrega, com clareza, qualidade e
                        foco em impacto real.
                    </p>
                </header>

                <div className="home-build__journey">
                    <svg
                        className="home-build__route"
                        viewBox="0 0 1200 430"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path d="M62 102 C198 102 268 102 392 102 S650 102 786 102 S1035 102 1138 102 C1178 102 1178 215 1138 215 C1040 215 1010 326 884 326 S620 326 506 326 S220 326 62 326" />
                    </svg>

                    <ol className="home-build__steps" aria-label="Etapas do fluxo de construção da YA LABS">
                        {buildSteps.map((step) => (
                            <li className={step.className} key={step.title}>
                                <article>
                                    <div className="home-build__step-meta">
                                        <span className="home-build__index">{step.index}</span>
                                        <code>yahub:~$ {step.command}</code>
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                    <span className="home-build__node" aria-hidden="true" />
                                </article>
                            </li>
                        ))}
                    </ol>
                </div>

                <dl className="home-build__principles" aria-label="Princípios do fluxo de construção">
                    <div>
                        <dt>status</dt>
                        <dd>contínuo</dd>
                    </div>
                    <div>
                        <dt>princípio</dt>
                        <dd>ship value, not features</dd>
                    </div>
                    <div>
                        <dt>métrica</dt>
                        <dd>impacto &gt; output</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
