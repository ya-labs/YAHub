import type { ReactNode } from "react";

type HomeShellProps = {
    children: ReactNode;
};

export function HomeShell ({ children }: HomeShellProps) {
    return (
        <div>
            <header>
                <strong>YAHub</strong>

                <nav aria-label="Navegação da Home">
                    <a href="#sobre">Sobre</a>
                    <a href="#projetos">Projetos</a>
                    <a href="#membros">Membros</a>
                    <a href="#contato">Contato</a>
                </nav>
            </header>

            <main>
                {children}
            </main>

            <footer>
                <small>YA LABS</small>
            </footer>
        </div>
    )
}