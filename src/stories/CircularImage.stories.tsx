import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircularImage } from '../components/CircularImage';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof CircularImage> = {
    title: 'Components/CircularImage',
    component: CircularImage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        image: 'https://placehold.co/200x200',
        radius: 100,
        radiusUnits: 'px',
    },
    play: async ({ canvasElement, step }) => {
        const screen = within(canvasElement);

        await step(
            'Renders with correct values',
            async () => {
                const div = screen.getByRole('wrapper');

                const { width, height } =
                    window.getComputedStyle(div);

                expect(width).toBe('200px');
                expect(height).toBe('200px');
            },
        );

        await step('Renders with image', async () => {
            const img = screen.getByRole('img');

            expect(img).toBeInTheDocument();
            expect(img).toHaveAttribute(
                'src',
                'https://placehold.co/200x200',
            );
        });
    },
};
