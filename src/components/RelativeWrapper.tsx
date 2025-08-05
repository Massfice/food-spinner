import React, { type PropsWithChildren } from 'react';
import cn from 'classnames';

type RelativeWrapperProps = PropsWithChildren<{
    className?: string;
}>;

export const RelativeWrapper: React.FC<
    RelativeWrapperProps
> = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                'relative overflow-hidden mb-4',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
};
