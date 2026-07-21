import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type HomeShellProps = {
    children: ReactNode;
};

export function HomeShell({ children }: HomeShellProps) {
    return (
        <div>
            <header>
                <strong>YA LABS</strong>

                <nav aria-label="Navegação da Home">
                    <a href="#home">Home</a>
                    <a href="#organizacao">Organização</a>
                    <a href="#ecossistema">Ecossistema YA</a>
                    <a href="#fluxo">Fluxo</a>
                    <a href="#produtos">Produtos</a>
                    <a href="#yahub">YAHub</a>
                </nav>

                <Link to="/portal">acessar portal</Link>
            </header>

            <main>{children}</main>

            <footer>
                <small>YA LABS</small>
            </footer>
        </div>
    );
}
