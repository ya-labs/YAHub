import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';

afterEach(() => {
    cleanup();
});

describe('App', () => {
    it('renderiza a home do YAHub', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: /home do yahub/i })).toBeInTheDocument();
    });

    it('renderiza a dashboard inicial do portal público', async () => {
        render(
            <MemoryRouter initialEntries={['/portal']}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { level: 1, name: 'YA LABS' })).toBeInTheDocument();
        expect(await screen.findByRole('heading', { name: /produtos oficiais/i })).toBeInTheDocument();
        expect(await screen.findByRole('heading', { name: /projetos com apoio da ya labs/i })).toBeInTheDocument();
        expect(screen.getByText(/projetos orientados pertencem aos seus autores/i)).toBeInTheDocument();
    });

    it('renderiza detalhes de um projeto do portal', async () => {
        render(
            <MemoryRouter initialEntries={['/portal/projetos/yahub']}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: /projeto: yahub/i })).toBeInTheDocument();
    });

    it.each([
        ['/portal/projetos', /projetos/i],
        ['/portal/membros', /membros/i],
        ['/portal/docs', /documentação/i],
        ['/portal/atividade', /atividades/i],
    ])('renderiza a rota pública %s', async (path, heading) => {
        render(
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument();
    });

    it('renderiza detalhes de um membro do portal', async () => {
        render(
            <MemoryRouter initialEntries={['/portal/membros/nicolas']}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: /membro: nicolas/i })).toBeInTheDocument();
    });

    it('redireciona a área administrativa para o login', async () => {
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: /acesso administrativo/i })).toBeInTheDocument();
    });

    it.each(['/admin/projetos', '/admin/membros'])('protege a rota administrativa %s', async (path) => {
        render(
            <MemoryRouter initialEntries={[path]}>
                <App />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('heading', { name: /acesso administrativo/i })).toBeInTheDocument();
    });
});
