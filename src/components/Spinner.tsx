import React, { useCallback, useEffect } from 'react';
import type {
    Circle,
    PositionalLayoutItem,
    PositionalLayoutReturn,
} from '../types';
import { CirclesWrapper } from './CirclesWrapper';
import { useCircularMovement } from '../hooks/useCircularMovement';
import type {
    CircularMovementInterface,
    SpinnerEventEmmitter,
} from '../types';

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

class CircularMovement
    implements CircularMovementInterface
{
    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        const winningIndex = Math.floor(
            Math.random() * count,
        );
        const fullSpins = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const spinDuration = (Math.random() * 5 + 1) * 1000; // 1 to 6 seconds in milliseconds
        const initialTime = performance.now();

        return {
            winningIndex,
            fullSpins,
            spinDuration,
            initialTime,
        };
    }
    forwardTime(callback: (time: number) => void): void {
        requestAnimationFrame(callback);
    }
}

export const Spinner: React.FC<SpinnerProps> = (props) => {
    const {
        className,
        center,
        radius,
        units,
        eventEmitter,
        winningPosition,
    } = props;

    const onWinnerFound = useCallback(
        (winner: PositionalLayoutItem<Circle> | null) => {
            if (winner) {
                props.onWinnerFound?.(winner);
            }
        },
        [props.onWinnerFound],
    );

    const { items: transformedItems, spin } =
        useCircularMovement({
            ...props,
            interface: new CircularMovement(),
            onWinnerFound,
        });

    useEffect(() => {
        eventEmitter.on('spin', spin);

        return () => {
            eventEmitter.off('spin', spin);
        };
    }, []);

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
