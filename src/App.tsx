import { useState } from 'react';
import { AppPage } from './pages/AppPage';
import { type Product } from './types';

function App() {
    const [items] = useState<Product[]>([
        {
            id: '1',
            image: '/p1.jpg',
            name: 'Gourmet Beef Medallion with Fresh Market Vegetables and Microgreens',
            description:
                'Tender pan-seared beef medallion topped with fresh herbs, served on a colorful medley of julienned vegetables, cherry tomatoes, and seasonal microgreens. A perfect balance of premium protein and farm-fresh vegetables.',
            price: 32,
            color: '#8B4513',
        },
        {
            id: '2',
            image: '/p2.png',
            name: 'Mongolian Beef with Mixed Vegetables',
            description:
                'Tender beef strips wok-tossed in a savory-sweet soy glaze with fresh broccoli, bell peppers, snow peas, and water chestnuts. Garnished with sesame seeds and green onions for an authentic Chinese dining experience.',
            price: 18.95,
            color: '#8B0000',
        },
        {
            id: '3',
            image: '/p3.jpg',
            name: 'Rainbow Buddha Bowl',
            description:
                'A vibrant and nutritious plant-based bowl featuring roasted golden potatoes, protein-rich lentils, fresh kale, purple cabbage, sliced avocado, and julienned carrots. A complete meal packed with vitamins, fiber, and healthy fats.',
            price: 14.5,
            color: '#228B22',
        },
        {
            id: '4',
            image: '/p4.jpg',
            name: 'Autumn Kale Salad with Persimmon and Pomegranate',
            description:
                'Fresh massaged kale tossed with sweet persimmon slices, antioxidant-rich pomegranate seeds, and creamy feta cheese crumbles. A perfect balance of seasonal flavors packed with vitamins and superfoods.',
            price: 13.75,
            color: '#FF8C00',
        },
        {
            id: '5',
            image: '/p5.jpg',
            name: 'Mediterranean Wellness Platter',
            description:
                'An artfully arranged sharing board featuring smoked salmon, hard-boiled egg, fresh blueberries, cherry tomatoes, mixed nuts, kiwi slices, avocado, Greek yogurt, and seasonal greens. Perfect for healthy sharing or a complete nutritious meal.',
            price: 24.95,
            color: '#4682B4',
        },
        {
            id: '6',
            image: '/p6.jpg',
            name: 'Polish Beef Kebab Plate',
            description:
                'Tender seasoned beef strips grilled to perfection, served with crispy golden fries and a fresh garden salad of mixed greens, cherry tomatoes, cucumber, and red onion. A hearty traditional Polish favorite.',
            price: 16.5,
            color: '#8B4513',
        },
    ]);

    return <AppPage items={items} />;
}
export default App;
