import { Circle } from './components/Circle';
import { CirclesWrapper } from './components/CirclesWrapper';
import { usePositionalLayout } from './hooks/usePositionalLayout';

function App() {
    const { items } = usePositionalLayout({
        items: [
            {
                id: '1',
                image: 'https://placehold.co/200x200',
            },
            {
                id: '2',
                image: 'https://placehold.co/200x200',
            },
            {
                id: '3',
                image: 'https://placehold.co/200x200',
            },
        ],
        center: { x: 50, y: 0 },
        radius: 15,
        ratio: 0.75,
        evenDistributionThreshold: 3,
    });

    return (
        <main className="w-full h-screen relative overflow-hidden">
            <Circle className="absolute left-[18%] bottom-[32%] w-full z-10">
                <CirclesWrapper
                    className="w-full h-full"
                    circles={items}
                    border={{
                        x: 50,
                        y: 0,
                        radius: 15,
                        units: '%',
                    }}
                />
            </Circle>
        </main>
    );
}
export default App;
