import React, {
    useCallback,
    useEffect,
    useState,
} from 'react';
import type {
    Circle,
    PositionalLayoutItem,
    PositionalLayoutReturn,
} from '../types';
import { CirclesWrapper } from './CirclesWrapper';
import { useCircularMovement } from '../hooks/useCircularMovement';
import type { SpinnerEventEmmitter } from '../types';
import {
    NearestCircularMovement,
    RandomizedCircularMovement,
} from '../utils/circularMovements';

type SpinnerProps = PositionalLayoutReturn<Circle> & {
    /**
     * The callback function to be called when the winner is found.
     */
    onWinnerFound?: (winner: Circle) => void;

    /**
     * The event emitter to be used to emit spin event.
     */
    eventEmitter: SpinnerEventEmmitter;

    /**
     * The classes of the spinner.
     */
    className?: string;
};

export const Spinner: React.FC<SpinnerProps> = (props) => {
    const {
        className,
        center,
        radius,
        units,
        eventEmitter,
        winningPosition,
    } = props;

    const [winner, setWinner] =
        useState<PositionalLayoutItem<Circle> | null>(null);

    const onWinnerFound = useCallback(
        (winner: PositionalLayoutItem<Circle> | null) => {
            if (winner) {
                setWinner(winner);
                props.onWinnerFound?.(winner);
            }
        },
        [props.onWinnerFound],
    );

    const { items: transformedItems, spin } =
        useCircularMovement({
            ...props,
            onWinnerFound,
        });

    const makeSpin = useCallback(() => {
        // spin(new RandomizedCircularMovement());
        spin(
            // new RandomizedCircularMovement(),
            new NearestCircularMovement(
                winner,
                'counterclockwise',
            ),
        );
    }, [spin]);

    useEffect(() => {
        eventEmitter.on('spin', makeSpin);

        return () => {
            eventEmitter.off('spin', makeSpin);
        };
    });

    return (
        <CirclesWrapper
            className={className}
            circles={transformedItems.map((item) => ({
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
            winningArea={
                winningPosition
                    ? {
                          x: winningPosition.x,
                          y: winningPosition.y,
                          radius:
                              transformedItems[0]?.radius ??
                              0,
                          units,
                      }
                    : undefined
            }
        />
    );
};
