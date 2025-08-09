import React from 'react';
import cn from 'classnames';
import { Circle } from './Circle';

type ArrowProps = {
    /**
     * Whether the arrow is disabled.
     */
    disabled?: boolean;

    /**
     * The event handler for when the arrow is clicked.
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;

    /**
     * The style of the arrow.
     */
    style?: React.CSSProperties;

    /**
     * The class name of the arrow.
     */
    className?: string;
};

export const Arrow: React.FC<ArrowProps> = (props) => {
    return (
        <Circle
            className={cn(
                'w-10 h-10 bg-red-500',
                props.className,
                {
                    'opacity-50': props.disabled,
                    'transition-all duration-300 ease-out active:scale-80 hover:scale-120':
                        !props.disabled,
                },
            )}
            role="button"
            onClick={props.onClick}
            style={props.style}
            disabled={props.disabled}
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L22 12L17 12L17 10L15 10L15 22L9 22L9 10L7 10L7 12L2 12L12 2Z"
                    fill="white"
                />
            </svg>
        </Circle>
    );
};
