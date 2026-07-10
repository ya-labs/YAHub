import type { ReactNode } from 'react';
import type { AsyncDataState } from '../hooks/useAsyncData';

type DataStateProps<T> = AsyncDataState<T> & {
    emptyMessage: string;
    getIsEmpty?: (data: T) => boolean;
    children: (data: T) => ReactNode;
};

export function DataState<T>({
    data,
    error,
    isLoading,
    emptyMessage,
    getIsEmpty = (currentData) => Array.isArray(currentData) && currentData.length === 0,
    children,
}: DataStateProps<T>) {
    if (isLoading) {
        return <p>Carregando dados...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    if (data === null || getIsEmpty(data)) {
        return <p>{emptyMessage}</p>;
    }

    return children(data);
}
