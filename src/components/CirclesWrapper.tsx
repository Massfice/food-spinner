import React from 'react';
import { CircularImage } from './CircularImage';
import cn from 'classnames';
import type { Units } from '../types';
import { positionCircle } from '../utils/position';

export type CirclePosition = {
    x: number;
    y: number;
};

type Circle = {
    /**
     * The id of the circle.
     */
    id: string;

    /**
     * The image to display in the circle.
     */
    image: string;

    /**
     * The position of the circle.
     */
    position: CirclePosition;

    /**
     * The radius of the circle.
     */
    radius: number;

    /**
     * The units of the circle.
     */
    units: Units;
};

type CirclesWrapperBorder = {
    x: number;
    y: number;
    radius: number;
    units: Units;
};

type CirclesWrapperProps = {
    /**
     * The circles to display in the wrapper.
     */
    circles: Circle[];

    /**
     * The class name of the wrapper.
     */
    className?: string;

    /**
     * The border of the wrapper.
     */
    border?: CirclesWrapperBorder;
};

export const CirclesWrapper: React.FC<
    CirclesWrapperProps
> = ({ circles, className, border }) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden',
                className,
            )}
            role="circles-wrapper"
        >
            {circles.map((circle) => (
                <CircularImage
                    className="absolute"
                    style={{
                        ...positionCircle(
                            {
                                x: circle.position.x,
                                y: circle.position.y,
                            },
                            circle.radius,
                            circle.units,
                        ),
                    }}
                    key={circle.id}
                    image={circle.image}
                    radius={circle.radius}
                    radiusUnits={circle.units}
                />
            ))}

            {border && (
                <div
                    className="absolute border-2 border-dashed border-red-200 rounded-full"
                    style={{
                        width: `${border.radius * 2}${
                            border.units
                        }`,
                        height: `${border.radius * 2}${
                            border.units
                        }`,
                        ...positionCircle(
                            {
                                x: border.x,
                                y: border.y,
                            },
                            border.radius,
                            border.units,
                        ),
                    }}
                />
            )}
        </div>
    );
};
