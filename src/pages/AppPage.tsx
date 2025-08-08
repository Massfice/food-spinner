import React, { useContext, useMemo } from 'react';
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
    const { setWinner, winner } =
        useContext(ProductsContext);

    const color = useMemo(() => {
        if (winner) {
            return winner.color;
        }
        return '#ECFCCB';
    }, [winner]);

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
        <main className="w-full h-screen md:relative overflow-auto md:overflow-hidden">
            <div className="flex md:static w-full h-full">
                <img
                    src="/foodspin.png"
                    className="md:absolute top-[3%] left-[6%] z-30"
                />

                <Navbar
                    className="md:absolute top-[5%] left-[30%] z-30 text-xl"
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

                <ShopIcon
                    className="left-[95%] top-[5%] w-full z-30 aspect-square"
                    size={30}
                />
            </div>

            <div className="relative p-100 md:static w=full">
                <Circle
                    className="absolute left-[-23%] bottom-[44%] md:left-[18%] md:bottom-[32%] w-full z-10"
                    style={{
                        backgroundColor: color,
                    }}
                >
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
            </div>

            <ProductInfoWithContext className="w-full md:absolute top-[10%] left-[3.9%] 2xl:top-[35%] 2xl:left-[6%]" />

            <PreviewButtonWithContext
                className="top-[58%] left-[56%] md:left-[60%] md:bottom-[-30%] z-30 aspect-square scale-220 md:scale-100"
                eventEmitter={eventEmitter}
                radius={20}
                radiusUnits="%"
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

export const AppPage: React.FC<AppPageProps> = (props) => {
    return (
        <ProductsProvider>
            <AppPageContent {...props} />
        </ProductsProvider>
    );
};
