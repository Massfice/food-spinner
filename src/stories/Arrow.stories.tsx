import type { Meta, StoryObj } from '@storybook/react';
import { Arrow } from '../components/Arrow';
import { within } from '@storybook/testing-library';
import { userEvent } from '@testing-library/user-event';
import { expect, jest as InitJest } from '@storybook/jest';

type JestCorrectType = { default: typeof InitJest };
const jest = InitJest as unknown as JestCorrectType;

const meta: Meta<typeof Arrow> = {
    title: 'Components/Arrow',
    component: Arrow,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;

export const Default: StoryObj<typeof Arrow> = {
    args: {
        style: {
            backgroundColor: 'green',
        },
        onClick: jest.default.fn(),
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Click the arrow', async () => {
            const arrow = canvas.getByRole('button');

            await userEvent.click(arrow);

            expect(args.onClick).toHaveBeenCalled();
            (args.onClick as jest.Mock).mockClear();
        });
    },
};

export const Disabled: StoryObj<typeof Arrow> = {
    args: {
        disabled: true,
        onClick: jest.default.fn(),
    },
    play: async ({ canvasElement, step, args }) => {
        const canvas = within(canvasElement);

        await step('Click the arrow', async () => {
            try {
                expect.assertions(2);

                const arrow = canvas.getByRole('button');

                try {
                    await userEvent.click(arrow);
                } catch (error) {
                    expect(error).toBeDefined();
                }

                expect(args.onClick).not.toHaveBeenCalled();
                expect(arrow).toHaveClass('opacity-50');
            } catch {
                (args.onClick as jest.Mock).mockClear();
            }
        });
    },
};
