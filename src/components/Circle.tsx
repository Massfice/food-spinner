import type React from 'react';
import cn from 'classnames';

type CircleProps = {
    className?: string;
};

export const Circle: React.FC<CircleProps> = ({
    className,
}) => {
    return (
        <div
            className={cn(
                'bg-lime-100 aspect-square rounded-full',
                className,
            )}
        ></div>
    );
};
