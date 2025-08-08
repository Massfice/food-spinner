import React, {
    createContext,
    useState,
    type PropsWithChildren,
} from 'react';
import { type Product } from '../types';

export const ProductsContext = createContext<{
    winner: Product | null;
    setWinner: (winner: Product | null) => void;
}>({
    winner: null,
    setWinner: () => {},
});

type ProductsProviderProps = PropsWithChildren<{}>;

export const ProductsProvider: React.FC<
    ProductsProviderProps
> = ({ children }) => {
    const [winner, setWinner] = useState<Product | null>(
        null,
    );

    return (
        <ProductsContext.Provider
            value={{ winner, setWinner }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
