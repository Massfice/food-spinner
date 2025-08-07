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

    const startAngleRadians = 3.925;

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
        radius: radius * ratio,
    };
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
    const result: PositionalLayoutReturn<T> =
        useMemo(() => {
            return {
                items: items.map((item, index) => {
                    const { position, radius: itemRadius } =
                        calculatePositionAndRadius({
                            index,
                            count: items.length,
                            evenDistributionThreshold,
                            center,
                            radius,
                            ratio: ratio / items.length,
                        });

                    return {
                        ...item,
                        position,
                        radius: itemRadius,
                        units: '%',
                    };
                }),
                winningPosition: null,
            };
        }, [
            items,
            center,
            radius,
            ratio,
            evenDistributionThreshold,
        ]);

    return result;
};
