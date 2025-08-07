import { useMemo } from 'react';
import type { Units } from '../types';

type PositionalLayoutItem<
    T extends Record<string, unknown>,
> = T & {
    position: {
        x: number;
        y: number;
    };
    radius: number;
    units: Units;
};

type PositionalLayoutProps<
    T extends Record<string, unknown>,
> = {
    /**
     * The list of items to layout.
     */
    items: T[];

    /**
     * The center of the circle.
     */
    center: {
        x: number;
        y: number;
    };

    /**
     * The radius of the circle.
     */
    radius: number;

    /**
     * The ratio of the radius to the number of items.
     */
    ratio: number;

    /**
     * The even distribution threshold.
     */
    evenDistributionThreshold: number;
};

type PositionalLayoutReturn<
    T extends Record<string, unknown>,
> = {
    items: PositionalLayoutItem<T>[];
    winningPosition: {
        x: number;
        y: number;
    } | null;
};

type CalculatePositionProps = {
    index: number;
    count: number;
    evenDistributionThreshold: number;
    center: {
        x: number;
        y: number;
    };
    radius: number;
    ratio: number;
};

const calculatePositionAndRadius = (
    props: CalculatePositionProps,
) => {
    const {
        index,
        count,
        evenDistributionThreshold,
        center: { x: centerX, y: centerY },
        radius,
        ratio,
    } = props;

    const startAngleRadians = Math.PI / 2;

    const angleIncrementRadians =
        (2 * Math.PI) / (evenDistributionThreshold + 1);
    const isEvenDistribution =
        count > evenDistributionThreshold;

    const angleInRadians = isEvenDistribution
        ? (2 * Math.PI * index) / count
        : startAngleRadians + index * angleIncrementRadians;

    const x = centerX + radius * Math.cos(angleInRadians);
    const y = centerY + radius * Math.sin(angleInRadians);

    return {
        position: { x, y },
        radius: radius * ratio > 4 ? 4 : radius * ratio,
    };
};

export const calculateWinningPosition = (
    positions: {
        x: number;
        y: number;
    }[],
) => {
    if (positions.length === 0) {
        return null;
    }

    if (positions.length === 1) {
        return positions[0];
    }

    const winningPositionIndex = Math.ceil(
        positions.length / 2,
    );

    const winningPosition = positions[winningPositionIndex];

    return winningPosition;
};

export const usePositionalLayout = <
    T extends Record<string, unknown>,
>({
    items,
    center,
    radius,
    ratio,
    evenDistributionThreshold,
}: PositionalLayoutProps<T>): PositionalLayoutReturn<T> => {
    const positions = useMemo(() => {
        return Array.from(
            { length: items.length },
            (_, index) => {
                const { position } =
                    calculatePositionAndRadius({
                        index: items.length - index - 1,
                        count: items.length,
                        evenDistributionThreshold,
                        center,
                        radius,
                        ratio: ratio / items.length,
                    });
                return position;
            },
        );
    }, [
        items.length,
        center,
        radius,
        ratio,
        evenDistributionThreshold,
    ]);

    const winningPosition = useMemo(() => {
        return calculateWinningPosition(positions);
    }, [positions]);

    const itemsWithPositions: PositionalLayoutItem<T>[] =
        useMemo(() => {
            return items.map((item, index) => ({
                ...item,
                position: positions[index],
                radius: positions[index]
                    ? radius * (ratio / items.length) > 4
                        ? 4
                        : radius * (ratio / items.length)
                    : 0,
                units: '%',
            }));
        }, [items, positions, radius, ratio]);

    return { items: itemsWithPositions, winningPosition };
};
