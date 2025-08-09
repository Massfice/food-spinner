import { useContext } from 'react';
import { Arrow } from './Arrow';
import { ProductsContext } from '../context/ProductsContext';

type ArrowWithContextProps = {
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    disabled?: boolean;
    className?: string;
};

export const ArrowWithContext: React.FC<
    ArrowWithContextProps
> = (props) => {
    const { winner } = useContext(ProductsContext);

    return (
        <Arrow
            className={props.className}
            onClick={props.onClick}
            disabled={props.disabled}
            style={{
                backgroundColor: winner
                    ? winner.color
                    : 'black',
            }}
        />
    );
};
