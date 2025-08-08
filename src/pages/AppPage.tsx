import React from 'react';
import { EventEmitter } from 'events';
import { Circle } from '../components/Circle';
import { Spinner } from '../components/Spinner';
import { usePositionalLayout } from '../hooks/usePositionalLayout';
import { useEffect } from 'react';

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
    const eventEmitter = new EventEmitter<{ spin: [] }>();

    useEffect(() => {
        setTimeout(() => {
            eventEmitter.emit('spin');
        }, 1000);
    }, []);

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
        </main>
    );
};
