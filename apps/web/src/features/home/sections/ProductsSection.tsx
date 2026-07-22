import { ChapterSignal } from '../components/ChapterSignal';

const products = [
    {
        name: 'SVNFlow',
        command: 'ys@hub:~$ svnflow --start',
        description: 'Ferramenta para padronizar fluxos com SVN, Git e entregas.',
        role: 'produto de fluxo',
        mark: 'SVN',
        className: 'home-product--svnflow',
    },
    {
        name: 'DevLab',
        command: 'ys@hub:~$ devlab --open',
        description: 'Produto educacional focado em aprendizado, trilhas, conteúdos e evolução técnica.',
        role: 'produto educacional',
        mark: '{ }',
        className: 'home-product--devlab',
    },
    {
        name: 'Spotifolio',
        command: 'ys@hub:~$ spotifolio --sync',
        description: 'Plataforma de portfólio musical e profissional.',
        role: 'produto de portfólio',
        mark: '♫',
        className: 'home-product--spotifolio',
    },
    {
        name: 'CADE-O-DANO',
        command: 'ys@hub:~$ cadeodano --scan',
        description: 'Projeto divertido e experimental voltado para League of Legends.',
        role: 'produto experimental',
        mark: '?',
        className: 'home-product--cadeodano',
    },
    {
        name: 'RMAWorker',
        command: 'ys@hub:~$ rmaworker --run',
        description: 'Produto voltado para automação e processos.',
        role: 'produto de automação',
        mark: 'RMA',
        className: 'home-product--rmaworker',
    },
    {
        name: 'Meu Treino',
        command: 'ys@hub:~$ meutreino --track',
        description: 'App voltado para treinos, academia e acompanhamento pessoal.',
        role: 'produto pessoal',
        mark: 'MT',
        className: 'home-product--meutreino',
    },
];

export function ProductsSection() {
    return (
        <section className="home-chapter home-portfolio" id="produtos" aria-labelledby="produtos-title">
            <ChapterSignal variant="blue" />
            <div className="home-chapter__frame home-products__frame">
                <div className="home-products__intro">
                    <p className="home-command">ys@hub:~$ products --list</p>
                    <h2 id="produtos-title">Produtos que nasceram no laboratório.</h2>
                    <p>
                        Softwares com identidade própria, criados na YA LABS para resolver problemas reais com código,
                        automação e escala.
                    </p>
                </div>

                <ul className="home-products__collection" aria-label="Produtos da YA LABS">
                    {products.map((product) => (
                        <li className={`home-product ${product.className}`} key={product.name}>
                            <article>
                                <code>{product.command}</code>
                                <span className="home-product__mark" aria-hidden="true">
                                    {product.mark}
                                </span>
                                <div className="home-product__copy">
                                    <p>{product.role}</p>
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>

                <p className="home-rule home-products__rule">
                    Se é um produto criado pela YA LABS, mas com identidade própria, não precisa usar prefixo YA.
                </p>
            </div>
        </section>
    );
}
