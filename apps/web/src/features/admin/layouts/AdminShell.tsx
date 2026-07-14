import { Link, Outlet } from 'react-router-dom';

export function AdminShell() {
    return (
        <div>
            <header>
                <strong>YAHub Admin</strong>

                <nav aria-label="Navegação do admin">
                    <Link to="/admin">Início</Link>
                    <Link to="/admin/projetos">Projetos</Link>
                    <Link to="/admin/membros">Membros</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
