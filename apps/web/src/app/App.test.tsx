import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
    it('renderiza a home do YAHub', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>,
        );

        expect(screen.getByRole('heading', { name: /home do yahub/i })).toBeInTheDocument();
    });

    it('renderiza o portal público', () => {
        render(
            <MemoryRouter initialEntries={['/portal']}>
                <App />
            </MemoryRouter>,
        );

        expect(screen.getByRole('heading', { name: /portal público do yahub/i })).toBeInTheDocument();
    });

    it('renderiza o admin', () => {
        render(
            <MemoryRouter initialEntries={['/admin']}>
                <App />
            </MemoryRouter>,
        );

        expect(screen.getByRole('heading', { name: /admin do yahub/i })).toBeInTheDocument();
    });
});
