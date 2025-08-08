import React, { useMemo } from 'react';
import { Circle } from './Circle';
import type { Units } from '../types';

type CircularImageProps = {
    /**
     * The radius of the circular image.
     */
    radius: number;

    /**
     * The units of the radius.
     */
    radiusUnits: Units;

    /**
     * The image to display in the circular image.
     */
    image: string;

    /**
     * Classes to apply to the circular image.
     */
    className?: string;

    /**
     * Styles to apply to the circular image.
     */
    style?: React.CSSProperties;

    /**
     * Event handler for when the mouse leaves the circular image.
     */
    onMouseOut?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the mouse enters the circular image.
     */
    onMouseOver?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the mouse enters the circular image.
     */
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the mouse leaves the circular image.
     */
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the transition starts.
     */
    onTransitionStart?: React.TransitionEventHandler<HTMLDivElement>;

    /**
     * Event handler for when the transition ends.
     */
    onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
};

export const CircularImage: React.FC<
    CircularImageProps
> = ({ radius, radiusUnits, image, style, ...props }) => {
    const width = useMemo(() => {
        return `${radius * 2}${radiusUnits}`;
    }, [radius, radiusUnits]);

    return (
        <Circle
            style={{
                width,
                height: width,
                ...style,
            }}
            role="image-wrapper"
            {...props}
        >
            <img
                src={image}
                className="object-cover w-full h-full"
                role="img"
            />
        </Circle>
    );
};
