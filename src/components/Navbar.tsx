import React from 'react';
import cn from 'classnames';

type NavbarProps = {
    /**
     * Menu items to display in the navbar.
     */
    items: {
        link: string;
        label: string;
    }[];

    /**
     * The classes of the navbar.
     */
    className?: string;
};

export const Navbar: React.FC<NavbarProps> = (props) => {
    return (
        <nav
            className={cn(
                'flex items-center justify-between min-w-100 ',
                props.className,
            )}
        >
            {props.items.map((item) => (
                <a
                    href={item.link}
                    key={item.label}
                    className="hover:underline underline-offset-4"
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
};
