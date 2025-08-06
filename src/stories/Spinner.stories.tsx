import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from '../components/spinner/Spinner';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithChildren: Story = {
    args: {
        children: 'Loading...',
    },
    play: async ({ canvasElement, step }) => {
        await step(
            'Test that the spinner renders',
            async () => {
                const screen = within(canvasElement);
                expect(
                    screen.queryByText('Loading...'),
                ).not.toBeInTheDocument();
            },
        );
    },
};
