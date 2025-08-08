import type { Meta, StoryObj } from '@storybook/react';
import { AppPage } from '../pages/AppPage';

const meta: Meta<typeof AppPage> = {
    title: 'Pages/AppPage',
    component: AppPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof AppPage> = {
    args: {
        items: [
            {
                id: '1',
                image: 'https://placehold.co/200x200',
                name: 'Product 1',
                description: 'Product 1 description',
                price: 100,
                color: '#000000',
            },
            {
                id: '2',
                image: 'https://placehold.co/300x300',
                name: 'Product 2',
                description: 'Product 2 description',
                price: 200,
                color: '#000000',
            },
            {
                id: '3',
                image: 'https://placehold.co/400x400',
                name: 'Product 3',
                description: 'Product 3 description',
                price: 300,
                color: '#000000',
            },
            {
                id: '4',
                image: 'https://placehold.co/500x500',
                name: 'Product 4',
                description: 'Product 4 description',
                price: 400,
                color: '#000000',
            },
            {
                id: '5',
                image: 'https://placehold.co/600x600',
                name: 'Product 5',
                description: 'Product 5 description',
                price: 500,
                color: '#000000',
            },
            {
                id: '6',
                image: 'https://placehold.co/700x700',
                name: 'Product 6',
                description: 'Product 6 description',
                price: 600,
                color: '#000000',
            },
        ],
    },
    render: (args) => {
        return (
            <div className="w-screen h-screen">
                <AppPage {...args} />
            </div>
        );
    },
};
