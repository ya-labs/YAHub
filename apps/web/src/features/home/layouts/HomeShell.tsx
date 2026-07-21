import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type HomeShellProps = {
    children: ReactNode;
};

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div className="home-shell">
            <a className="home-skip-link" href="#conteudo-principal">
                Pular para o conteúdo principal
            </a>

            <header className="home-header">
                <span className="home-header__spacer" aria-hidden="true" />

                <nav className="home-nav" aria-label="Navegação da Home">
                    <a className="home-nav__link home-nav__link--active" href="#home">
                        home
                    </a>
                    <a className="home-nav__link" href="#organizacao">
                        about
                    </a>
                    <a className="home-nav__link" href="#ecossistema" aria-label="Ecossistema YA">
                        ecosystem
                    </a>
                    <a className="home-nav__link" href="#produtos" aria-label="Produtos">
                        products
                    </a>
                </nav>

                <Link className="home-header__cta" to="/portal">
                    acessar portal
                </Link>
            </header>

            <main className="home-main" id="conteudo-principal">
                {children}
            </main>

            <footer className="home-footer">
                <small>YA LABS</small>
            </footer>
        </div>
    );
}
