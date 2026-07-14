import { Suspense, type ReactNode } from 'react';

export function withSuspense(element: ReactNode) {
    return <Suspense fallback={<p>Carregando página...</p>}>{element}</Suspense>;
}
