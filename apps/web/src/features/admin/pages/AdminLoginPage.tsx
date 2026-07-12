import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAdmin, registerAdmin } from '../auth/adminAuth';

type AuthMode = 'login' | 'register';

type LoginLocationState = {
    from?: {
        pathname?: string;
    };
};

export function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState<AuthMode>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('admin@yalabs.local');
    const [password, setPassword] = useState('admin');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const locationState = location.state as LoginLocationState | null;
    const redirectPath = locationState?.from?.pathname ?? '/admin';
    const isRegisterMode = mode === 'register';

    async function handleSubmit(event: { preventDefault: () => void }) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            if (isRegisterMode) {
                await registerAdmin({ name, email, password });
            } else {
                await loginAdmin({ email, password });
            }

            navigate(redirectPath, { replace: true });
        } catch (currentError: unknown) {
            setError(
                currentError instanceof Error
                    ? currentError.message
                    : 'Não foi possível acessar a área administrativa.',
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="admin-auth">
            <section className="admin-auth__panel">
                <p className="portal-kicker">Administração</p>
                <h1>Acesso administrativo</h1>
                <p>
                    Entre com o login mockado para gerenciar os conteúdos públicos da YA LABS enquanto a API real não
                    estiver integrada.
                </p>

                <div className="admin-auth__tabs" aria-label="Modo de acesso">
                    <button
                        type="button"
                        aria-pressed={!isRegisterMode}
                        className={!isRegisterMode ? 'admin-auth__tab admin-auth__tab--active' : 'admin-auth__tab'}
                        onClick={() => setMode('login')}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        aria-pressed={isRegisterMode}
                        className={isRegisterMode ? 'admin-auth__tab admin-auth__tab--active' : 'admin-auth__tab'}
                        onClick={() => setMode('register')}
                    >
                        Cadastro
                    </button>
                </div>

                <form className="admin-auth__form" onSubmit={handleSubmit}>
                    {isRegisterMode ? (
                        <label>
                            Nome
                            <input
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Administrador YA LABS"
                                required
                            />
                        </label>
                    ) : null}

                    <label>
                        E-mail
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Senha
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            minLength={3}
                        />
                    </label>

                    {error ? <p role="alert">{error}</p> : null}

                    <button type="submit" className="portal-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Entrando...' : isRegisterMode ? 'Cadastrar e entrar' : 'Entrar'}
                    </button>
                </form>

                <p className="admin-auth__note">
                    Fluxo temporário com sessão local. A estrutura já usa os contratos de login e cadastro para facilitar
                    a troca pela API real.
                </p>
            </section>
        </main>
    );
}
