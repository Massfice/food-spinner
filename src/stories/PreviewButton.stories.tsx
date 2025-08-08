import type { Meta, StoryObj } from '@storybook/react';
import { PreviewButton } from '../components/PreviewButton';
import { SpinnerEventEmmitter } from '../types';
import {
    userEvent,
    waitFor,
    within,
} from '@storybook/testing-library';
import { expect, jest as InitJest } from '@storybook/jest';

type JestCorrectType = { default: typeof InitJest };
const jest = InitJest as unknown as JestCorrectType;

const meta: Meta<typeof PreviewButton> = {
    title: 'Components/PreviewButton',
    component: PreviewButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof PreviewButton> = {
    args: {
        eventEmitter: new SpinnerEventEmmitter(),
        itemToDisplay: {
            image: 'https://placehold.co/200x200',
            radius: 100,
            radiusUnits: 'px',
        },
    },
    play: async ({ canvasElement, step, args }) => {
        const screen = within(canvasElement);

        await step('Click the button', async () => {
            const fn = jest.default.fn();

            args.eventEmitter.on('spin', fn);

            await userEvent.hover(
                screen.getByRole('image-wrapper'),
            );

            await waitFor(async () => {
                expect(
                    screen.getByRole('button'),
                ).toHaveClass('opacity-100');
            });

            await userEvent.click(
                screen.getByRole('button'),
            );

            expect(fn).toHaveBeenCalled();
        });

        await step('Unhover the button', async () => {
            await userEvent.hover(
                screen.getByRole('image-wrapper'),
            );

            await userEvent.unhover(
                screen.getByRole('button'),
            );

            await waitFor(async () => {
                expect(
                    screen.getByRole('button'),
                ).toHaveClass('opacity-0');
            });
        });
    },
};
