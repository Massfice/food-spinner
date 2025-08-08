import React, { useMemo, useState } from 'react';
import type { SpinnerEventEmmitter, Units } from '../types';
import { CircularImage } from './CircularImage';
import { Circle } from './Circle';
import cn from 'classnames';

type PreviewButtonProps = {
    /**
     * The event emitter to be used to emit spin event.
     */
    eventEmitter: SpinnerEventEmmitter;

    /**
     * The preview image to display.
     */
    itemToDisplay: {
        image: string;
        radius: number;
        radiusUnits: Units;
    };

    /**
     * Classes to apply to the button.
     */
    className?: string;
};

export const PreviewButton: React.FC<PreviewButtonProps> = (
    props,
) => {
    const { image, radius, radiusUnits } =
        props.itemToDisplay;

    const width = useMemo(() => {
        return `${radius * 2}${radiusUnits}`;
    }, [radius, radiusUnits]);

    const [showButton, setShowButton] = useState(false);

    const handleMouseEnter = () => {
        requestAnimationFrame(() => {
            setShowButton(true);
        });
    };

    const handleMouseLeave = () => {
        setShowButton(false);
    };

    return (
        <div
            style={{
                position: 'relative',
                width,
                height: width,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CircularImage
                radius={radius}
                radiusUnits={radiusUnits}
                image={image}
                className={cn(
                    'absolute transition-all duration-300 ease-out',
                    props.className,
                    {
                        'opacity-0': showButton,
                        'opacity-100': !showButton,
                    },
                )}
            />
            <Circle
                onClick={() =>
                    props.eventEmitter.emit('spin')
                }
                className={cn(
                    'absolute transition-all duration-300 ease-out bg-orange-400 shadow-lg shadow-orange-500/50',
                    'active:bg-orange-500 active:shadow-orange-600/50 active:scale-95',
                    props.className,
                    {
                        'opacity-0': !showButton,
                        'opacity-100': showButton,
                        'pointer-events-auto': showButton,
                        'pointer-events-none': !showButton,
                    },
                )}
                role="button"
                style={{
                    width,
                    height: width,
                }}
            >
                <span className="font-bold text-lg text-white">
                    🎯 Spin
                </span>
            </Circle>
        </div>
    );
};
