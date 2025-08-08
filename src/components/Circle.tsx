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

    /**
     * Whether the circle is disabled.
     */
    disabled?: boolean;

    /**
     * Event handler for when the mouse enters the circle.
     */
    onMouseOver?: React.MouseEventHandler<unknown>;

    /**
     * Event handler for when the mouse enters the circle.
     */
    onMouseEnter?: React.MouseEventHandler<unknown>;

    /**
     * Event handler for when the mouse leaves the circle.
     */
    onMouseLeave?: React.MouseEventHandler<unknown>;

    /**
     * Event handler for when the circle is clicked.
     */
    onClick?: React.MouseEventHandler<unknown>;

    /**
     * Event handler for when the mouse leaves the circle.
     */
    onMouseOut?: React.MouseEventHandler<unknown>;

    /**
     * Event handler for when the transition starts.
     */
    onTransitionStart?: React.TransitionEventHandler<unknown>;

    /**
     * Event handler for when the transition ends.
     */
    onTransitionEnd?: React.TransitionEventHandler<unknown>;
};

const Button = (props: CircleProps) => {
    return <button {...props} />;
};

const Div = (props: CircleProps) => {
    return <div {...props} />;
};

export const Circle: React.FC<CircleProps> = ({
    children,
    className,
    ...props
}) => {
    const Component =
        props.role === 'button' ? Button : Div;

    return (
        <Component
            className={cn(
                'aspect-square overflow-hidden rounded-full flex items-center justify-center',
                className,
            )}
            {...props}
        >
            {children}
        </Component>
    );
};
