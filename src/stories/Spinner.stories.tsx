import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/Spinner';
import EventEmitter from 'events';
import { useEffect, useState } from 'react';
import type { Circle } from '../types';

const meta: Meta<typeof Spinner> = {
    title: 'Components/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Spinner> = {
    args: {
        items: [
            {
                id: '1',
                image: 'https://placehold.co/200x200',
                position: { x: 200, y: 200 },
                radius: 75,
                units: 'px',
            },
        ],
        center: { x: 400, y: 400 },
        radius: 200,
        units: 'px',
        winningPosition: { x: 200, y: 200 },
        className: 'w-200 h-200',
    },
    render: (args) => {
        const eventEmitter = new EventEmitter<{
            spin: [];
        }>();

        const [winner, setWinner] = useState<Circle | null>(
            null,
        );

        useEffect(() => {
            if (!winner) {
                return;
            }

            setWinner(null);
            eventEmitter.emit('spin');
        }, [winner]);

        return (
            <Spinner
                {...args}
                eventEmitter={eventEmitter}
                onWinnerFound={setWinner}
            />
        );
    },
};
