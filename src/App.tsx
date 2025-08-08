import { EventEmitter } from 'events';
import { Circle } from './components/Circle';
import { Spinner } from './components/Spinner';
import { usePositionalLayout } from './hooks/usePositionalLayout';
import { useEffect } from 'react';

function App() {
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
        items: [
            {
                id: '1',
                image: 'https://placehold.co/200x200',
            },
            {
                id: '2',
                image: 'https://placehold.co/300x300',
            },
            {
                id: '3',
                image: 'https://placehold.co/400x400',
            },
            {
                id: '4',
                image: 'https://placehold.co/500x500',
            },
            {
                id: '5',
                image: 'https://placehold.co/600x600',
            },
            {
                id: '6',
                image: 'https://placehold.co/700x700',
            },
            // {
            //     id: '7',
            //     image: 'https://placehold.co/200x200',
            // },
            // {
            //     id: '8',
            //     image: 'https://placehold.co/200x200',
            // },
            // {
            //     id: '9',
            //     image: 'https://placehold.co/200x200',
            // },
            // {
            //     id: '10',
            //     image: 'https://placehold.co/200x200',
            // },
        ],
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
                {/* <CirclesWrapper
                    className="w-full h-full"
                    circles={items}
                    border={{
                        x: center.x,
                        y: center.y,
                        radius: radius,
                        units: units,
                    }}
                /> */}
            </Circle>
        </main>
    );
}
export default App;
