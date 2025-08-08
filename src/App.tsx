import { useState } from 'react';
import { AppPage } from './pages/AppPage';

function App() {
    const [items] = useState([
        {
            id: '1',
            image: 'https://img.pikbest.com/photo/20240911/a-food-plate-with-gourmet-steak-_10827371.jpg!w700wp',
        },
        {
            id: '2',
            image: 'https://png.pngtree.com/png-clipart/20250105/original/pngtree-a-plate-of-food-that-includes-beef-vegetables-and-meat-on-png-image_20072173.png',
        },
        {
            id: '3',
            image: 'https://hpba.pl/wp-content/uploads/2015/09/talerz-vege.jpg',
        },
        {
            id: '4',
            image: 'https://media.istockphoto.com/id/1291892578/de/foto/gem%C3%BCse-salat-sch%C3%BCssel-in-frauenh%C3%A4nden-frischer-gr%C3%BCnkohl-und-gebackener-k%C3%BCrbissalat-gesundes.jpg?s=612x612&w=0&k=20&c=O_YZhDZ5bO-qZlZLWYQzWXkl60RiLizu_ag2xNBxamg=',
        },
        {
            id: '5',
            image: 'https://img.pikbest.com/photo/20240608/a-plate-of-food-with-fruits-and-vegetables-on-it_10600415.jpg!w700wp',
        },
        {
            id: '6',
            image: 'https://finezjapizza.pl/wp-content/uploads/2024/02/danie-kebab-wolowe.jpg',
        },
    ]);

    return <AppPage items={items} />;
}
export default App;
