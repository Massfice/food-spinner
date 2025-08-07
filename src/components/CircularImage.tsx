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
};

export const CircularImage: React.FC<
    CircularImageProps
> = ({ radius, radiusUnits, image, style, className }) => {
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
            className={className}
        >
            <img
                src={image}
                className="object-cover w-full h-full"
                role="img"
            />
        </Circle>
    );
};
