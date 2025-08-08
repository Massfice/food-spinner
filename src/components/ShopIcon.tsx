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
        <div>
            <div
                className={cn(
                    'inline-block relative',
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
                    {/* Rectangle bag body */}
                    <rect
                        x="4"
                        y="10"
                        width="16"
                        height="16"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    {/* Left handle */}
                    <path
                        d="M8 10V6C8 4.89543 8.89543 4 10 4C11.1046 4 12 4.89543 12 6V10"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                    {/* Right handle */}
                    <path
                        d="M16 10V6C16 4.89543 15.1046 4 14 4C12.8954 4 12 4.89543 12 6V10"
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
        </div>
    );
};
