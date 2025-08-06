import type React from 'react';
import cn from 'classnames';
import { RelativeWrapper } from './RelativeWrapper';

type CircleProps = {
    className?: string;
};

type PositionedComponent = {
    x: number;
    y: number;
    width: number;
    height: number;
    angleInRadians: number;
    index: number;
    isEvenDistribution: boolean;
};

const calculateComponentPositions = (
    count: number,
): PositionedComponent[] => {
    const positions: PositionedComponent[] = [];

    const centerX = 45.6;
    const centerY = 94.85;
    const radius = 16;
    const ratio = 1.2 / count;

    // Progressive distribution parameters
    const evenDistributionThreshold = 3;
    const startAngleRadians = 3.925; // 225 degrees (between D and A)

    // Calculate increment to fill the circle evenly based on threshold
    const angleIncrementRadians =
        (2 * Math.PI) / (evenDistributionThreshold + 1);
    const isEvenDistribution =
        count > evenDistributionThreshold;

    for (let index = 0; index < count; index++) {
        let angleInRadians: number;

        if (isEvenDistribution) {
            // Use even distribution for all components
            angleInRadians = (2 * Math.PI * index) / count;
        } else {
            // Use progressive distribution for all components
            angleInRadians =
                startAngleRadians +
                index * angleIncrementRadians;
        }

        const x =
            centerX + radius * Math.cos(angleInRadians);
        const y =
            centerY + radius * Math.sin(angleInRadians);

        positions.push({
            x,
            y,
            width: radius * ratio,
            height: radius * ratio,
            angleInRadians,
            index,
            isEvenDistribution,
        });
    }

    return positions;
};

const toArray = (n: number) => {
    const length = Math.max(n, 4);
    const result = Array.from({ length }, (_, i) => ({
        index: i,
        present: i >= length - n,
    }));
    return n === 0 ? [] : result;
};

const generateDummyComponents = (count: number) => {
    const components: React.ReactNode[] = [];
    const indices = toArray(count);
    const positions = calculateComponentPositions(
        indices.length,
    );

    for (const { index, present } of indices) {
        const position = positions[index];

        console.log({
            angleInRadians: position.angleInRadians,
            index,
            mode: position.isEvenDistribution
                ? 'even'
                : 'progressive',
        });

        components.push(
            <div
                key={index}
                className={cn(
                    'absolute rounded-full transition-all duration-100',
                    {
                        'bg-red-500':
                            present &&
                            index !== indices.length - 1,
                        'bg-blue-500':
                            present &&
                            index === indices.length - 1,
                        hidden: !present,
                    },
                )}
                style={{
                    top: `${position.y}%`,
                    left: `${position.x}%`,
                    width: `${position.width}%`,
                    height: `${position.height}%`,
                }}
            />,
        );
    }

    return components;
};

export const Circle: React.FC<CircleProps> = ({
    className,
}) => {
    const components = generateDummyComponents(1);

    return (
        <div
            className={cn(
                'bg-lime-100 aspect-square rounded-full overflow-hidden',
                className,
            )}
        >
            <RelativeWrapper className="w-full h-full">
                {components}
            </RelativeWrapper>
        </div>
    );
};
