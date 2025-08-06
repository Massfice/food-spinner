import type { Meta, StoryObj } from '@storybook/react-vite';
import { CirclesWrapper } from '../components/CirclesWrapper';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { convertPercents } from '../utils/test/convertPercents';

const meta: Meta<typeof CirclesWrapper> = {
    title: 'Components/CirclesWrapper',
    component: CirclesWrapper,
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof meta> = {
    args: {
        className: 'w-200 h-200',
        circles: [
            {
                id: '1',
                image: 'https://placehold.co/200x200',
                position: {
                    x: 0,
                    y: 0,
                },
                radius: 50,
                units: '%',
            },
            {
                id: '2',
                image: 'https://placehold.co/200x200',
                position: {
                    x: 700,
                    y: 700,
                },
                radius: 50,
                units: 'px',
            },
            {
                id: '3',
                image: 'https://placehold.co/200x200',
                position: {
                    x: 700,
                    y: 0,
                },
                radius: 50,
                units: 'px',
            },
        ],
    },
    play: async ({ canvasElement, step }) => {
        const screen = within(canvasElement);

        await step(
            'Renders with correct values',
            async () => {
                const div = screen.getByRole(
                    'circles-wrapper',
                );

                const [
                    firstCircle,
                    secondCircle,
                    thirdCircle,
                ] = div.children;

                const {
                    bottom: firstCircleBottom,
                    left: firstCircleLeft,
                } = window.getComputedStyle(firstCircle);

                const {
                    bottom: secondCircleBottom,
                    left: secondCircleLeft,
                } = window.getComputedStyle(secondCircle);

                const {
                    bottom: thirdCircleBottom,
                    left: thirdCircleLeft,
                } = window.getComputedStyle(thirdCircle);

                expect(firstCircleBottom).toBe(
                    convertPercents('0%', 800),
                );
                expect(firstCircleLeft).toBe(
                    convertPercents('0%', 800),
                );

                expect(secondCircleBottom).toBe('700px');
                expect(secondCircleLeft).toBe('700px');

                expect(thirdCircleBottom).toBe('0px');
                expect(thirdCircleLeft).toBe('700px');
            },
        );
    },
};
