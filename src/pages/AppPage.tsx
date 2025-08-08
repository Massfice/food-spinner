import React, { useContext } from 'react';
import { Circle } from '../components/Circle';
import { Spinner } from '../components/Spinner';
import { usePositionalLayout } from '../hooks/usePositionalLayout';
import {
    type Product,
    SpinnerEventEmmitter,
} from '../types';
import { ShopIcon } from '../components/ShopIcon';
import { Navbar } from '../components/Navbar';
import {
    ProductsContext,
    ProductsProvider,
} from '../context/ProductsContext';
import { ProductInfoWithContext } from '../components/ProductInfoWithContext';
import { PreviewButtonWithContext } from '../components/PreviewButtonWithContext';

type AppPageProps = {
    /**
     * The items to display in the app.
     */
    items: Product[];
};

const AppPageContent: React.FC<AppPageProps> = (props) => {
    const eventEmitter = new SpinnerEventEmmitter();
    const { setWinner } = useContext(ProductsContext);

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
                    onWinnerFound={setWinner}
                />
            </Circle>

            <PreviewButtonWithContext
                className="left-[60%] bottom-[-30%] w-full z-30 aspect-square"
                eventEmitter={eventEmitter}
                radius={20}
                radiusUnits="%"
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

            <ProductInfoWithContext className="w-full absolute top-[35%] left-[6%]" />

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

export const AppPage: React.FC<AppPageProps> = (props) => {
    return (
        <ProductsProvider>
            <AppPageContent {...props} />
        </ProductsProvider>
    );
};
