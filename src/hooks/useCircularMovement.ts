import { useState } from 'react';
import type {
    CircularMovementReturn,
    PositionalLayoutReturn,
} from '../types';

export interface CircularMovementInterface {
    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    };
    forwardTime(callback: (time: number) => void): void;
}

type UseMovementProps<T extends Record<string, unknown>> =
    PositionalLayoutReturn<T> & {
        interface: CircularMovementInterface;
    };

const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
};

export const useCircularMovement = <
    T extends Record<string, unknown>,
>(
    props: UseMovementProps<T>,
): CircularMovementReturn<T> => {
    const { winningPosition, radius, center } = props;

    const getAngle = (x: number, y: number): number => {
        const formalizedX = x - center.x;
        const formalizedY = y - center.y;

        return Math.atan2(formalizedY, formalizedX);
    };

    let initialItems = !winningPosition ? [] : props.items;

    const initialWinner =
        initialItems.find(
            (item) =>
                winningPosition &&
                item.position.x === winningPosition.x &&
                item.position.y === winningPosition.y,
        ) ?? null;

    const [winner, setWinner] = useState(initialWinner);
    const [items, setItems] = useState(initialItems);

    const spin = () => {
        if (!winningPosition) {
            return;
        }

        const {
            winningIndex,
            fullSpins,
            spinDuration,
            initialTime,
        } = props.interface.randomize(items.length);

        const winner = items[winningIndex];

        let elapsedTime = 0;
        const forwardTime = (time: number) => {
            const deltaTime = time - initialTime;

            const t = Math.min(deltaTime / spinDuration, 1);
            const easedT = easeOutCubic(t);

            elapsedTime = easedT;

            const winnerCurrentAngle = getAngle(
                winner.position.x,
                winner.position.y,
            );

            const winningSpotAngle = getAngle(
                winningPosition.x,
                winningPosition.y,
            );

            const angleToWinningSpot =
                winningSpotAngle - winnerCurrentAngle;

            const totalRotation =
                angleToWinningSpot +
                2 * Math.PI * fullSpins;

            const newItems = items.map((item) => {
                const currentAngle = getAngle(
                    item.position.x,
                    item.position.y,
                );

                const movingAngle = totalRotation * easedT;

                const newAngle = currentAngle + movingAngle;
                const newPosition = {
                    x:
                        center.x +
                        radius * Math.cos(newAngle),
                    y:
                        center.y +
                        radius * Math.sin(newAngle),
                };

                return {
                    ...item,
                    position: newPosition,
                };
            });

            setItems(newItems);

            if (elapsedTime < spinDuration) {
                props.interface.forwardTime(forwardTime);

                return;
            }

            setWinner(winner);
            elapsedTime = 0;
        };

        props.interface.forwardTime(forwardTime);
    };

    return { items, winner, spin };
};
