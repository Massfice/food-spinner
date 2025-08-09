import React, { useContext, useMemo } from 'react';
import { Circle } from '../components/Circle';
import { Spinner } from '../components/Spinner';
import { usePositionalLayout } from '../hooks/usePositionalLayout';
import {
    type Product,
    SpinnerEventEmmitter,
} from '../types';
import { Navbar } from '../components/Navbar';
import {
    ProductsContext,
    ProductsProvider,
} from '../context/ProductsContext';
import { ProductInfoWithContext } from '../components/ProductInfoWithContext';
import { PreviewButtonWithContext } from '../components/PreviewButtonWithContext';
import { ArrowWithContext } from '../components/ArrowWithContext';

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
        <main className="w-full h-screen md:relative overflow-hidden">
            <div className="flex md:static w-full h-10 md:h-full">
                <Navbar
                    className="md:absolute top-[2%] left-[1%] z-30 text-xl w-full"
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
            </div>

            <div className="relative p-100 md:static w=full">
                <div className="absolute left-[-23%] bottom-[43%] md:left-[18%] md:bottom-[32%] w-full z-10">
                    <Circle
                        style={{
                            backgroundColor: color,
                        }}
                    >
                        <Spinner
                            className="w-full h-full"
                            items={items}
                            winningPosition={
                                winningPosition
                            }
                            center={center}
                            radius={radius}
                            units={units}
                            eventEmitter={eventEmitter}
                            onWinnerFound={setWinner}
                        />
                    </Circle>

                    <PreviewButtonWithContext
                        className="right-[18%] top-[91%] z-30"
                        eventEmitter={eventEmitter}
                        radius={20}
                        radiusUnits="%"
                    />

                    <ArrowWithContext
                        className="absolute right-[35%] top-[100%] z-30"
                        onClick={() => {
                            eventEmitter.emit(
                                'forward',
                                'counterclockwise',
                            );
                        }}
                        disabled={
                            !winner || items.length < 2
                        }
                    />
                    <ArrowWithContext
                        className="absolute right-[64%] top-[100%] z-30"
                        onClick={() => {
                            eventEmitter.emit(
                                'forward',
                                'clockwise',
                            );
                        }}
                        disabled={
                            !winner || items.length < 2
                        }
                    />
                </div>
            </div>

            <ProductInfoWithContext className="w-full md:absolute top-[10%] left-[3.9%] 2xl:top-[35%] 2xl:left-[6%]" />

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
