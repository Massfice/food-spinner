import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import { PreviewButton } from './PreviewButton';
import {
    type SpinnerEventEmmitter,
    type Units,
} from '../types';

type PreviewButtonWithContextProps = {
    eventEmitter: SpinnerEventEmmitter;
    className?: string;
    radius: number;
    radiusUnits: Units;
};

export const PreviewButtonWithContext: React.FC<
    PreviewButtonWithContextProps
> = (props) => {
    const { winner } = useContext(ProductsContext);

    if (!winner) {
        return <></>;
    }

    return (
        <PreviewButton
            className={props.className}
            eventEmitter={props.eventEmitter}
            itemToDisplay={{
                image: winner.image,
                radius: props.radius,
                radiusUnits: props.radiusUnits,
            }}
        />
    );
};
