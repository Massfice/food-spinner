import React from 'react';
import { Circle } from '../components/Circle';
import { Spinner } from '../components/Spinner';
import { usePositionalLayout } from '../hooks/usePositionalLayout';
import { SpinnerEventEmmitter } from '../types';
import { PreviewButton } from '../components/PreviewButton';
import { ShopIcon } from '../components/ShopIcon';
import { Navbar } from '../components/Navbar';
import { ProductInfo } from '../components/ProductInfo';

type AppPageProps = {
    /**
     * The items to display in the app.
     */
    items: {
        id: string;
        image: string;
    }[];
};

export const AppPage: React.FC<AppPageProps> = (props) => {
    const eventEmitter = new SpinnerEventEmmitter();

    const {
        items,
        center,
        radius,
        units,
        winningPosition,
    } = usePositionalLayout({
        items: props.items,
        center: { x: 50, y: 0 },
        radius: 15,
        ratio: 1.2,
        evenDistributionThreshold: 3,
    });

    return (
        <main className="w-full h-screen relative overflow-hidden">
            <Circle className="absolute left-[18%] bottom-[32%] w-full z-10">
                <Spinner
                    className="w-full h-full"
                    items={items}
                    winningPosition={winningPosition}
                    center={center}
                    radius={radius}
                    units={units}
                    eventEmitter={eventEmitter}
                />
            </Circle>

            <PreviewButton
                className="left-[60%] bottom-[-30%] w-full z-30 aspect-square"
                eventEmitter={eventEmitter}
                itemToDisplay={{
                    image: items[0].image,
                    radius: 20,
                    radiusUnits: items[0].units,
                }}
            />

            <ShopIcon
                className="left-[95%] top-[5%] w-full z-30 aspect-square"
                size={30}
            />

            <img
                src="/foodspin.png"
                className="absolute top-[3%] left-[6%] z-30"
            />

            <Navbar
                className="absolute top-[5%] left-[30%] z-30 text-xl"
                items={[
                    {
                        label: 'Breakfast',
                        link: '#breakfast',
                    },
                    {
                        label: 'Lunch',
                        link: '#lunch',
                    },
                    {
                        label: 'Dinner',
                        link: '#dinner',
                    },
                ]}
            />

            <ProductInfo
                className="w-full absolute top-[35%] left-[6%]"
                name="Product Name"
                price={100}
                description="Product Description"
                color="#7FFF00"
            />

            <div className="absolute top-[90%] left-[7%] z-30">
                <a
                    href="#video"
                    className="hover:underline underline-offset-4 text-xl"
                >
                    Watch The Video
                </a>
            </div>
        </main>
    );
};
