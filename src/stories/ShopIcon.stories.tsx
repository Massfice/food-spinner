import type { Meta, StoryObj } from '@storybook/react';
import { ShopIcon } from '../components/ShopIcon';

const meta: Meta<typeof ShopIcon> = {
    title: 'Components/ShopIcon',
    component: ShopIcon,
    parameters: {
        layout: 'centered',
        backgrounds: {
            default: 'light',
            values: [
                { name: 'light', value: '#f5f5f5' },
                { name: 'dark', value: '#333333' },
            ],
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: {
                type: 'range',
                min: 16,
                max: 128,
                step: 4,
            },
        },
        color: {
            control: { type: 'color' },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 24,
        color: '#000000',
    },
};

export const Large: Story = {
    args: {
        size: 48,
        color: '#000000',
    },
};

export const Orange: Story = {
    args: {
        size: 32,
        color: '#fb923c',
    },
};

export const Small: Story = {
    args: {
        size: 16,
        color: '#374151',
    },
};
