import { Link, Outlet } from "react-router-dom";

export function PortalShell () {
    return (
        <div>
            <header>
                <strong>YAHub Portal</strong>
 
                <nav aria-label="Navegação do portal">
                    <Link to="/portal">Início</Link>
                    <Link to="/portal/projetos">Projetos</Link>
                    <Link to="/portal/membros">Membros</Link>
                    <Link to="/portal/docs">Docs</Link>
                    <Link to="/portal/atividade">Atividade</Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    )   
}