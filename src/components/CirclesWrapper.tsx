import React from 'react';
import { CircularImage } from './CircularImage';
import cn from 'classnames';
import type { Units, Circle } from '../types';
import { positionCircle } from '../utils/position';

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

    /**
     * The winning area of the wrapper.
     */
    winningArea?: CirclesWrapperBorder;
};

export const CirclesWrapper: React.FC<
    CirclesWrapperProps
> = ({ circles, className, border, winningArea }) => {
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
                    className="absolute z-10"
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
                    className="absolute z-0 border-2 border-dashed border-red-200 rounded-full"
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

            {winningArea && (
                <div
                    className="absolute z-0 border-2 border-solid border-4 border-green-400 rounded-full z-20"
                    style={{
                        width: `${winningArea.radius * 2}${
                            winningArea.units
                        }`,
                        height: `${winningArea.radius * 2}${
                            winningArea.units
                        }`,
                        ...positionCircle(
                            {
                                x: winningArea.x,
                                y: winningArea.y,
                            },
                            winningArea.radius,
                            winningArea.units,
                        ),
                    }}
                />
            )}
        </div>
    );
};
