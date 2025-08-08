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
