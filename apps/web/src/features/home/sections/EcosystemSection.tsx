import { ChapterSignal } from '../components/ChapterSignal';

const ecosystemModules = [
    {
        name: 'YAHub',
        role: 'portal central',
        description: 'Portal central da organização, usado para visualizar projetos, membros, atividades e documentos.',
        className: 'home-ecosystem__module--hub',
    },
    {
        name: 'YABook',
        role: 'conhecimento',
        description: 'Documentação, padrões, guias e engenharia da organização.',
        className: 'home-ecosystem__module--book',
    },
    {
        name: 'YAGit',
        role: 'fluxo',
        description: 'Ferramenta para automação e padronização de fluxos Git e GitHub.',
        className: 'home-ecosystem__module--git',
    },
    {
        name: 'YABot',
        role: 'integração',
        description: 'Bot do Discord para comunicação, notificações, automações e integrações.',
        className: 'home-ecosystem__module--bot',
    },
];

export function EcosystemSection() {
    return (
        <section className="home-chapter home-ecosystem" id="ecossistema" aria-labelledby="ecossistema-title">
            <ChapterSignal variant="orange" />
            <div className="home-chapter__frame home-ecosystem__frame">
                <div className="home-ecosystem__intro">
                    <p className="home-command">ya@hub:~$ ecossistema ya</p>
                    <h2 id="ecossistema-title">Ecossistema YA</h2>
                    <p className="home-ecosystem__lead">As ferramentas que mantêm a YA LABS em movimento.</p>
                    <p>
                        O Ecossistema YA reúne ferramentas oficiais usadas para organizar, operar, documentar,
                        automatizar e visualizar a própria YA LABS.
                    </p>
                </div>

                <div className="home-ecosystem__map">
                    <svg
                        className="home-ecosystem__connections"
                        viewBox="0 0 800 560"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path d="M390 282 C280 230 245 130 155 105" pathLength="1" />
                        <path d="M390 282 C290 330 250 430 145 455" pathLength="1" />
                        <path d="M410 282 C535 260 585 165 680 145" pathLength="1" />
                    </svg>

                    <ul aria-label="Módulos do Ecossistema YA">
                        {ecosystemModules.map((module) => (
                            <li className={`home-ecosystem__module ${module.className}`} key={module.name}>
                                <span className="home-ecosystem__module-role">{module.role}</span>
                                <h3>{module.name}</h3>
                                <p>{module.description}</p>
                            </li>
                        ))}
                    </ul>

                    <pre className="home-ecosystem__log" aria-label="Status do Ecossistema YA">{`> conectando ecossistema...
> mapeando módulos...
> estruturando relações...
> sincronizando ferramentas...

> pronto!`}</pre>
                </div>

                <p className="home-rule home-ecosystem__rule">
                    Se serve para organizar, operar, documentar ou automatizar a YA LABS, pode usar prefixo YA.
                </p>
            </div>
        </section>
    );
}
