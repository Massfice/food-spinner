import { Circle } from './components/Circle';

function App() {
    return (
        <main className="w-full h-screen relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full z-0 bg-white" />
            <Circle className="absolute left-[18%] bottom-[32%] w-full z-10" />
        </main>
    );
}
export default App;
