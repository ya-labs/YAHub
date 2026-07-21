const products = [
    {
        name: 'SVNFlow',
        command: 'ys@hub:~$ svnflow --start',
        description: 'Ferramenta para padronizar fluxos com SVN, Git e entregas.',
    },
    {
        name: 'DevLab',
        command: 'ys@hub:~$ devlab --open',
        description: 'Produto educacional focado em aprendizado, trilhas, conteúdos e evolução técnica.',
    },
    {
        name: 'Spotifolio',
        command: 'ys@hub:~$ spotifolio --sync',
        description: 'Plataforma de portfólio musical e profissional.',
    },
    {
        name: 'CADE-O-DANO',
        command: 'ys@hub:~$ cadeodano --scan',
        description: 'Projeto divertido e experimental voltado para League of Legends.',
    },
    {
        name: 'RMAWorker',
        command: 'ys@hub:~$ rmaworker --run',
        description: 'Produto voltado para automação e processos.',
    },
    {
        name: 'Meu Treino',
        command: 'ys@hub:~$ meutreino --track',
        description: 'App voltado para treinos, academia e acompanhamento pessoal.',
    },
];

export function ProductsSection() {
    return (
        <section id="produtos" aria-labelledby="produtos-title">
            <h2 id="produtos-title">Produtos que nasceram no laboratório.</h2>
            <p>
                Softwares com identidade própria, criados na YA LABS para resolver problemas reais com código,
                automação e escala.
            </p>

            <ul>
                {products.map((product) => (
                    <li key={product.name}>
                        <article>
                            <code>{product.command}</code>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </article>
                    </li>
                ))}
            </ul>

            <p>
                Se é um produto criado pela YA LABS, mas com identidade própria, não precisa usar prefixo YA.
            </p>
        </section>
    );
}
