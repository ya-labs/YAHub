import { Link } from 'react-router-dom';

export function HeroSection() {
    return (
        <section className="home-hero" id="home" aria-labelledby="home-title">
            <span className="home-hero__orbit home-hero__orbit--one" aria-hidden="true" />
            <span className="home-hero__orbit home-hero__orbit--two" aria-hidden="true" />
            <span className="home-hero__marker home-hero__marker--one" aria-hidden="true" />
            <span className="home-hero__marker home-hero__marker--two" aria-hidden="true" />

            <div className="home-hero__content">
                <p className="home-hero__eyebrow">YAHub é a porta de entrada da YA LABS.</p>
                <h1 className="home-hero__title" id="home-title" aria-label="YA LABS">
                    <span className="home-hero__ya">
                        <span>Y</span>
                        <span className="home-hero__a">
                            A<span aria-hidden="true">✦</span>
                        </span>
                    </span>
                    <span className="home-hero__labs">LABS</span>
                </h1>
                <p className="home-hero__slogan">
                    Code. Automate. <strong>Scale.</strong>
                </p>
                <Link className="home-hero__cta" to="/portal">
                    acessar portal
                </Link>
            </div>

            <a className="home-hero__scroll" href="#organizacao" aria-label="Ir para a seção sobre a organização">
                <span>scroll</span>
                <span aria-hidden="true">↓</span>
            </a>
        </section>
    );
}
