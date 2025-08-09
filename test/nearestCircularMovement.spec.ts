import { describe, expect, it } from 'vitest';
import {
    Circle,
    Position,
    PositionalLayoutItem,
} from '../src/types';
import { NearestCircularMovement } from '../src/utils/circularMovements';

const center: Position = {
    x: 100,
    y: 100,
};

const circle1: PositionalLayoutItem<Circle> = {
    id: '1',
    index: 2,
    image: 'image',
    radius: 10,
    units: 'px',
    color: 'red',
    name: 'point1',
    price: 100,
    description: 'description',
    position: {
        x: 100,
        y: 0,
    },
};

const circle2: PositionalLayoutItem<Circle> = {
    id: '2',
    index: 1,
    image: 'image',
    radius: 10,
    units: 'px',
    color: 'red',
    name: 'point1',
    price: 100,
    description: 'description',
    position: {
        x: 75,
        y: 75,
    },
};

const circle3: PositionalLayoutItem<Circle> = {
    id: '3',
    index: 3,
    image: 'image',
    radius: 10,
    units: 'px',
    color: 'red',
    name: 'point1',
    price: 100,
    description: 'description',
    position: {
        x: 0,
        y: 100,
    },
};

const circle4: PositionalLayoutItem<Circle> = {
    id: '4',
    index: 0,
    image: 'image',
    radius: 10,
    units: 'px',
    color: 'red',
    name: 'point1',
    price: 100,
    description: 'description',
    position: {
        x: -75,
        y: 75,
    },
};

describe('NearestCircularMovement', () => {
    it.each([
        {
            name: 'p1 -> p3',
            winner: circle1,
            nearest: circle3,
            fullSpins: 0,
        },
        {
            name: 'p2 -> p1',
            winner: circle2,
            nearest: circle1,
            fullSpins: 0,
        },
        {
            name: 'p3 -> p4',
            winner: circle3,
            nearest: circle4,
            fullSpins: 1,
        },
        {
            name: 'p4 -> p2',
            winner: circle4,
            nearest: circle2,
            fullSpins: 0,
        },
    ])(
        'returns the nearest point index with correct data for clockwise movement: $name',
        ({ winner, nearest, fullSpins }) => {
            const movement = new NearestCircularMovement(
                winner,
                'clockwise',
                [circle4, circle2, circle1, circle3],
                center,
            );

            const { initialTime, ...result } =
                movement.randomize(4);

            expect(result).toEqual({
                winningIndex: nearest.index,
                fullSpins,
                spinDuration: 100,
                direction: 'clockwise',
            });
        },
    );

    it.each([
        {
            name: 'p1 -> p2',
            winner: circle1,
            nearest: circle2,
            fullSpins: 0,
        },
        {
            name: 'p2 -> p4',
            winner: circle2,
            nearest: circle4,
            fullSpins: 0,
        },
        {
            name: 'p3 -> p1',
            winner: circle3,
            nearest: circle1,
            fullSpins: 0,
        },
        {
            name: 'p4 -> p3',
            winner: circle4,
            nearest: circle3,
            fullSpins: 1,
        },
    ])(
        'returns the nearest point index with correct data for counter-clockwise movement: $name',
        ({ winner, nearest, fullSpins }) => {
            const movement = new NearestCircularMovement(
                winner,
                'counterclockwise',
                [circle4, circle2, circle1, circle3],
                center,
            );

            const { initialTime, ...result } =
                movement.randomize(4);

            expect(result).toEqual({
                winningIndex: nearest.index,
                fullSpins,
                spinDuration: 100,
                direction: 'counterclockwise',
            });
        },
    );

    it('throws error if no winner is provided', () => {
        let asserted = false;

        const movement = new NearestCircularMovement(
            null,
            'clockwise',
            [circle1, circle2, circle3, circle4],
            center,
        );

        try {
            movement.randomize(4);
        } catch (error) {
            expect(error.message).toBe(
                'No winner provided',
            );

            asserted = true;
        }

        expect({ asserted }).toEqual({ asserted: true });
    });

    it('throws error if there is less than 2 items', () => {
        let asserted = false;

        const movement = new NearestCircularMovement(
            circle1,
            'clockwise',
            [circle1],
            center,
        );

        try {
            movement.randomize(1);
        } catch (error) {
            expect(error.message).toBe(
                'There must be at least 2 items',
            );

            asserted = true;
        }

        expect({ asserted }).toEqual({ asserted: true });
    });
});
