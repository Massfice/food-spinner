import React from 'react';
import type {
    Circle,
    PositionalLayoutReturn,
    Units,
} from '../types';
import { CirclesWrapper } from './CirclesWrapper';
import { EventEmitter } from 'events';

type CircleLayoutReturn = PositionalLayoutReturn<Circle>;

type SpinnerProps = {
    /**
     * The items to layout.
     */
    items: CircleLayoutReturn['items'];

    /**
     * The winning position calculated by the algorithm.
     */
    winningPosition: CircleLayoutReturn['winningPosition'];

    /**
     * The center of the spinner.
     */
    center: CircleLayoutReturn['center'];

    /**
     * The radius of the spinner.
     */
    radius: CircleLayoutReturn['radius'];

    /**
     * The units of the spinner.
     */
    units: Units;

    /**
     * The callback function to be called when the winner is found.
     */
    onWinnerFound?: (winner: Circle) => void;

    /**
     * The event emitter to be used to emit spin event.
     */
    eventEmitter: EventEmitter<{ spin: [] }>;

    /**
     * The classes of the spinner.
     */
    className?: string;
};

export const Spinner: React.FC<SpinnerProps> = (props) => {
    const {
        className,
        items,
        center,
        radius,
        units,
        eventEmitter,
    } = props;

    eventEmitter.on('spin', () => {});

    return (
        <CirclesWrapper
            className={className}
            circles={items.map((item) => ({
                ...item,
                position: item.position,
                radius: item.radius,
                units: item.units,
            }))}
            border={{
                x: center.x,
                y: center.y,
                radius,
                units,
            }}
        />
    );
};
