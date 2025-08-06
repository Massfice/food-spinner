import React from 'react';
import { CircularImage } from './CircularImage';
import cn from 'classnames';

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
    position: {
        x: number;
        y: number;
    };

    /**
     * The radius of the circle.
     */
    radius: number;

    /**
     * The units of the circle.
     */
    units:
        | 'px'
        | 'rem'
        | 'em'
        | 'vw'
        | 'vh'
        | 'vmin'
        | 'vmax'
        | '%';
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
};

export const CirclesWrapper: React.FC<
    CirclesWrapperProps
> = ({ circles, className }) => {
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
                        bottom: `${circle.position.y}${circle.units}`,
                        left: `${circle.position.x}${circle.units}`,
                    }}
                    key={circle.id}
                    image={circle.image}
                    radius={circle.radius}
                    radiusUnits={circle.units}
                />
            ))}
        </div>
    );
};
