import { Link } from 'react-router-dom';

export function HeroSection() {
    return (
        <section id="home" aria-labelledby="home-title">
            <p>YAHub é a porta de entrada da YA LABS.</p>
            <h1 id="home-title">YA LABS</h1>
            <p>Code. Automate. Scale.</p>
            <p>Tudo que a YA LABS constrói, organiza e documenta começa pelo YAHub.</p>
            <Link to="/portal">acessar portal</Link>
            <a href="#organizacao" aria-label="Ir para a seção sobre a organização">
                scroll
            </a>
        </section>
    );
}
