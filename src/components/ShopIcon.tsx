import React from 'react';
import cn from 'classnames';
import { Circle } from './Circle';

type ShopIconProps = {
    /**
     * Size of the icon in pixels
     */
    size?: number;

    /**
     * Additional CSS classes
     */
    className?: string;

    /**
     * Color of the icon
     */
    color?: string;
};

export const ShopIcon: React.FC<ShopIconProps> = ({
    size = 24,
    className,
    color = 'currentColor',
}) => {
    return (
        <div
            className={cn(
                'relative inline-block',
                className,
            )}
            style={{ width: size, height: size }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 8H5L3 13V24C3 24.5523 3.44772 25 4 25H20C20.5523 25 21 24.5523 21 24V13L19 8Z"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <path
                    d="M9 12V8C9 6.89543 9.89543 6 11 6H13C14.1046 6 15 6.89543 15 8V12"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </svg>

            <Circle
                className="absolute bottom-0 right-0 bg-orange-400"
                style={{
                    width: size * 0.3,
                    height: size * 0.3,
                }}
            />
        </div>
    );
};
