import { NavLink, Outlet } from 'react-router-dom';

const portalLinks = [
    { to: '/portal', label: 'Visão geral', end: true },
    { to: '/portal/projetos', label: 'Projetos' },
    { to: '/portal/membros', label: 'Membros' },
    { to: '/portal/docs', label: 'Docs' },
    { to: '/portal/atividade', label: 'Atividade' },
];

export function PortalShell() {
    return (
        <div className="portal-shell">
            <header className="portal-header">
                <NavLink className="portal-brand" to="/portal">
                    YAHub Portal
                </NavLink>

                <nav aria-label="Navegação do portal" className="portal-nav">
                    {portalLinks.map((link) => (
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'portal-nav__link portal-nav__link--active' : 'portal-nav__link'
                            }
                            end={link.end}
                            key={link.to}
                            to={link.to}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            </header>

            <main className="portal-main">
                <Outlet />
            </main>
        </div>
    );
}
