import { useState } from 'react';
import type {
    CircularMovementReturn,
    CircularMovementInterface,
    PositionalLayoutReturn,
    Position,
    PositionalLayoutItem,
} from '../types';
import {
    easeOutCubic,
    getAngle,
    movePoint,
} from '../utils/math';

type UseMovementProps<T extends Record<string, unknown>> =
    PositionalLayoutReturn<T> & {
        interface: CircularMovementInterface;
        onWinnerFound: (
            winner: PositionalLayoutItem<T> | null,
        ) => void;
    };

const createElapsedTimeCalculator =
    (spinDuration: number, initialTime: number) =>
    (time: number) => {
        const deltaTime = time - initialTime;

        const easedT = easeOutCubic(
            Math.min(deltaTime / spinDuration, 1),
        );

        return { easedT, deltaTime };
    };

const createTotalRotationCalculator = (
    winningSpotPosition: Position,
    center: Position,
    fullSpins: number,
) => {
    const positionToAngle = (position: Position) => {
        const angle = getAngle(
            position.x,
            position.y,
            center,
        );

        return angle;
    };

    return (winnerPosition: Position | null) => {
        if (!winnerPosition) {
            return 0;
        }

        const winnerCurrentAngle =
            positionToAngle(winnerPosition);
        const winningSpotAngle = positionToAngle(
            winningSpotPosition,
        );

        const angleToWinningSpot =
            winningSpotAngle - winnerCurrentAngle;

        const totalRotation =
            angleToWinningSpot + 2 * Math.PI * fullSpins;

        return totalRotation;
    };
};

const createItemTransformer =
    <T extends { [key: string]: unknown }>(
        totalRotation: number,
        easedT: number,
        center: Position,
        radius: number,
    ) =>
    (item: PositionalLayoutItem<T>) => {
        const newPosition = movePoint(
            item.position.x,
            item.position.y,
            totalRotation,
            easedT,
            center,
            radius,
        );

        return {
            ...item,
            position: newPosition,
        };
    };

export const useCircularMovement = <
    T extends Record<string, unknown>,
>(
    props: UseMovementProps<T>,
): CircularMovementReturn<T> => {
    const {
        winningPosition,
        radius,
        center,
        onWinnerFound,
    } = props;

    let initialItems = !winningPosition ? [] : props.items;

    const initialWinner =
        initialItems.find(
            (item) =>
                winningPosition &&
                item.position.x === winningPosition.x &&
                item.position.y === winningPosition.y,
        ) ?? null;

    onWinnerFound(initialWinner);

    const [items, setItems] = useState(initialItems);

    let elapsedTime = 0;
    /**
     * Spin the items around the circle.
     *
     * After the items have spun around the circle, the winner is found and the
     * onWinnerFound callback is called.
     *
     * Algorithm:
     * 1. Randomize the number of full spins and the spin duration.
     * 2. Randomize the winning index.
     * 3. Calculate the elapsed time and the total rotation:
     *    Total rotation is the angle needed to move the item to the winning position after the full spins.
     *    Elapsed time is the time that has passed since the start of the spin.
     * 4. Transform the items based on the total rotation and the elapsed time.
     * 5. If the elapsed time is less than the spin duration, continue spinning. This reduces jumps.
     * 6. If eased time is less than 1, continue spinning.
     * 7. If the elapsed time is greater than the spin duration and eased time is 1, the winner is found
     *    and the onWinnerFound callback is called. The winner is the item that is
     *    at the winning index.
     * 8. Reset the elapsed time and continue spinning.
     *
     * Function uses wrapper interface to forward a time. Internally it uses requestAnimationFrame.
     *
     * @returns {void}
     */
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

        const winner = items[winningIndex] || null;

        const calculateElapsedTime =
            createElapsedTimeCalculator(
                spinDuration,
                initialTime,
            );

        const calculateTotalRotation =
            createTotalRotationCalculator(
                winningPosition,
                center,
                fullSpins,
            );

        const forwardTime = (time: number) => {
            const { easedT, deltaTime } =
                calculateElapsedTime(time);
            elapsedTime += deltaTime;

            const totalRotation = calculateTotalRotation(
                winner?.position,
            );

            const transformItem = createItemTransformer<T>(
                totalRotation,
                easedT,
                center,
                radius,
            );

            const newItems = items.map(transformItem);

            setItems(newItems);

            if (elapsedTime < spinDuration || easedT < 1) {
                props.interface.forwardTime(forwardTime);

                return;
            }

            onWinnerFound(newItems[winningIndex]);
            elapsedTime = 0;
        };

        props.interface.forwardTime(forwardTime);
    };

    return { items, spin };
};
