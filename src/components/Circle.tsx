import React from 'react';
import cn from 'classnames';
// import { RelativeWrapper } from './RelativeWrapper';

type CircleProps = {
    /**
     * The content of the circle.
     */
    children?: React.ReactNode;

    /**
     * Classes to apply to the circle.
     */
    className?: string;

    /**
     * Styles to apply to the circle.
     */
    style?: React.CSSProperties;

    /**
     * The role of the circle.
     */
    role?: string;
};

export const Circle: React.FC<CircleProps> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div
            className={cn(
                'bg-lime-100 aspect-square rounded-full overflow-hidden flex items-center justify-center',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};
