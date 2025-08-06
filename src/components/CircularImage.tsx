import React, { useMemo } from 'react';
import { Circle } from './Circle';

type CircularImageProps = {
    /**
     * The radius of the circular image.
     */
    radius: number;

    /**
     * The units of the radius.
     */
    radiusUnits:
        | 'px'
        | 'rem'
        | 'em'
        | 'vw'
        | 'vh'
        | 'vmin'
        | 'vmax'
        | '%';

    /**
     * The image to display in the circular image.
     */
    image: string;

    /**
     * Classes to apply to the circular image.
     */
    className?: string;
};

export const CircularImage: React.FC<
    CircularImageProps
> = ({ radius, radiusUnits, image }) => {
    const width = useMemo(() => {
        return `${radius * 2}${radiusUnits}`;
    }, [radius, radiusUnits]);

    return (
        <Circle
            style={{
                width,
                height: width,
            }}
            role="wrapper"
        >
            <img
                src={image}
                className="object-cover w-full h-full"
                role="img"
            />
        </Circle>
    );
};
