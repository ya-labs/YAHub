import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
    it('renderiza a base do YA Hub', () => {
        render(<App />)

        expect(screen.getByText(/YA Hub/i)).toBeInTheDocument()
    })
})