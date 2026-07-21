const ecosystemModules = [
    {
        name: 'YAHub',
        description: 'Portal central da organização, usado para visualizar projetos, membros, atividades e documentos.',
    },
    {
        name: 'YABook',
        description: 'Documentação, padrões, guias e engenharia da organização.',
    },
    {
        name: 'YAGit',
        description: 'Ferramenta para automação e padronização de fluxos Git e GitHub.',
    },
    {
        name: 'YABot',
        description: 'Bot do Discord para comunicação, notificações, automações e integrações.',
    },
];

export function EcosystemSection() {
    return (
        <section className="home-section home-section--ecosystem" id="ecossistema" aria-labelledby="ecossistema-title">
            <div className="home-section__intro">
                <p className="home-command">ya@hub:~$ ecossistema ya</p>
                <h2 id="ecossistema-title">Ecossistema YA</h2>
                <p>As ferramentas que mantêm a YA LABS em movimento.</p>
                <p>
                    O Ecossistema YA reúne ferramentas oficiais usadas para organizar, operar, documentar, automatizar e
                    visualizar a própria YA LABS.
                </p>
            </div>

            <ul className="home-module-grid" aria-label="Módulos do Ecossistema YA">
                {ecosystemModules.map((module) => (
                    <li key={module.name}>
                        <h3>{module.name}</h3>
                        <p>{module.description}</p>
                    </li>
                ))}
            </ul>

            <pre className="home-terminal" aria-label="Status do Ecossistema YA">{`> conectando ecossistema...
> mapeando módulos...
> estruturando relações...
> sincronizando ferramentas...

> pronto!`}</pre>

            <p className="home-rule">Se serve para organizar, operar, documentar ou automatizar a YA LABS, pode usar prefixo YA.</p>
        </section>
    );
}
