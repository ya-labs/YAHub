const buildSteps = [
    { index: '01', title: 'Ideia', command: 'yahub:~$ new idea' },
    { index: '02', title: 'Documentação', command: 'yahub:~$ docs init' },
    { index: '03', title: 'Issue', command: 'yahub:~$ issue create' },
    { index: '04', title: 'Branch', command: 'yahub:~$ git checkout -b' },
    { index: '05', title: 'Pull Request', command: 'yahub:~$ pr open' },
    { index: '06', title: 'Release', command: 'yahub:~$ release create' },
];

export function BuildFlowSection() {
    return (
        <section className="home-chapter home-build" id="fluxo" aria-labelledby="fluxo-title">
            <div className="home-chapter__frame home-build__frame">
                <div className="home-build__intro">
                    <p className="home-command">yahub:~$ build --from idea</p>
                    <h2 id="fluxo-title">Como uma ideia vira produto.</h2>
                    <p>
                        Um fluxo colaborativo, transparente e iterativo. Da ideia à entrega, com clareza, qualidade e
                        foco em impacto real.
                    </p>
                </div>

                <div className="home-build__track">
                    <ol className="home-build__steps" aria-label="Etapas do fluxo de construção da YA LABS">
                        {buildSteps.map((step) => (
                            <li key={step.title}>
                                <span className="home-build__index">{step.index}</span>
                                <span className="home-build__node" aria-hidden="true" />
                                <div>
                                    <h3>{step.title}</h3>
                                    <code>{step.command}</code>
                                </div>
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
