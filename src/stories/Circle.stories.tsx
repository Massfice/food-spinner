import type { Meta, StoryObj } from '@storybook/react-vite';
import { Circle } from '../components/Circle';

const meta: Meta<typeof Circle> = {
    title: 'Components/Circle',
    component: Circle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        className: 'w-20 bg-red-500',
        children: 'Hello',
    },
};
