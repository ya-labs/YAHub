const buildSteps = [
    { title: '01. Ideia', command: 'yahub:~$ new idea' },
    { title: '02. Documentação', command: 'yahub:~$ docs init' },
    { title: '03. Issue', command: 'yahub:~$ issue create' },
    { title: '04. Branch', command: 'yahub:~$ git checkout -b' },
    { title: '05. Pull Request', command: 'yahub:~$ pr open' },
    { title: '06. Release', command: 'yahub:~$ release create' },
];

export function BuildFlowSection() {
    return (
        <section id="fluxo" aria-labelledby="fluxo-title">
            <h2 id="fluxo-title">Como uma ideia vira produto.</h2>
            <p>
                Um fluxo colaborativo, transparente e iterativo. Da ideia à entrega, com clareza, qualidade e foco em
                impacto real.
            </p>

            <ol>
                {buildSteps.map((step) => (
                    <li key={step.title}>
                        <h3>{step.title}</h3>
                        <code>{step.command}</code>
                    </li>
                ))}
            </ol>

            <dl>
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
        </section>
    );
}
