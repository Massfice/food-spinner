import { Circle } from './components/Circle';
import { RelativeWrapper } from './components/RelativeWrapper';

function App() {
    return (
        <main className="w-full h-screen">
            <RelativeWrapper className="h-full">
                <div className="absolute top-0 left-0 w-full h-full z-0 bg-white" />
                <Circle className="absolute left-[18%] bottom-[32%] w-full z-10" />
            </RelativeWrapper>
        </main>
    );
}
export default App;
