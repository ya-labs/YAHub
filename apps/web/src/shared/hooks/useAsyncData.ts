import { useEffect, useState } from 'react';

export type AsyncDataState<T> = {
    data: T | null;
    error: string | null;
    isLoading: boolean;
};

export function useAsyncData<T>(loadData: () => Promise<T>): AsyncDataState<T> {
    const [state, setState] = useState<AsyncDataState<T>>({
        data: null,
        error: null,
        isLoading: true,
    });

    useEffect(() => {
        let isActive = true;

        Promise.resolve()
            .then(() => {
                if (isActive) {
                    setState({ data: null, error: null, isLoading: true });
                }

                return loadData();
            })
            .then((data) => {
                if (isActive) {
                    setState({ data, error: null, isLoading: false });
                }
            })
            .catch((error: unknown) => {
                if (isActive) {
                    setState({
                        data: null,
                        error: error instanceof Error ? error.message : 'Não foi possível carregar os dados.',
                        isLoading: false,
                    });
                }
            });

        return () => {
            isActive = false;
        };
    }, [loadData]);

    return state;
}
