import React, { useContext } from 'react';
import { ProductInfo } from './ProductInfo';
import { ProductsContext } from '../context/ProductsContext';

type ProductInfoWithContextProps = {
    className?: string;
};

export const ProductInfoWithContext: React.FC<
    ProductInfoWithContextProps
> = ({ className }) => {
    const { winner } = useContext(ProductsContext);

    if (!winner) {
        return <></>;
    }

    return (
        <ProductInfo
            className={className}
            name={winner.name}
            price={winner.price}
            description={winner.description}
            color={winner.color}
        />
    );
};
