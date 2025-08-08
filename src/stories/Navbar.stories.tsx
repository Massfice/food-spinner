import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../components/Navbar';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Navbar> = {
    title: 'Components/Navbar',
    component: Navbar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Navbar> = {
    args: {
        items: [
            {
                link: '/',
                label: 'Home',
            },
            {
                link: '/about',
                label: 'About',
            },
        ],
    },
    play: async ({ canvasElement, step }) => {
        const screen = within(canvasElement);

        await step(
            'checks if home link is rendered',
            async () => {
                const homeLink = screen.getByText('Home');

                expect(homeLink).toHaveAttribute(
                    'href',
                    '/',
                );
            },
        );

        await step(
            'checks if about link is rendered',
            async () => {
                const aboutLink = screen.getByText('About');

                expect(aboutLink).toHaveAttribute(
                    'href',
                    '/about',
                );
            },
        );
    },
};
