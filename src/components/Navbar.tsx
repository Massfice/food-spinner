import React from 'react';
import cn from 'classnames';
import { ShopIcon } from './ShopIcon';

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
        <nav className={cn('relative', props.className)}>
            <div className="absolute flex items-center w-full">
                <img
                    className="mr-[15%]"
                    src="/foodspin.png"
                />

                <div className="flex items-center gap-20 2xl:gap-100 2xl:mr-[14%]">
                    {props.items.map((item) => (
                        <a
                            href={item.link}
                            key={item.label}
                            className="hover:underline underline-offset-4"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>

            <ShopIcon
                className="aspect-square absolute top-5 left-[95%]"
                size={30}
            />
        </nav>
    );
};
