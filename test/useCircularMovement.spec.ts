import { describe } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import {
    useCircularMovement,
    type CircularMovementInterface,
} from '../src/hooks/useCircularMovement';
import { PositionalLayoutItem } from '../src/types';

class DummyCircularMovement
    implements CircularMovementInterface
{
    forwardTime(): void {
        throw new Error('Method not implemented.');
    }
    randomize(): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        throw new Error('Method not implemented.');
    }
}

class TestCircularMovement
    implements CircularMovementInterface
{
    private callback: ((time: number) => void) | null;

    forwardTime(callback: (time: number) => void): void {
        this.callback = callback;
    }

    setTime(time: number): void {
        const callback = this.callback;
        this.callback = null;
        callback?.(time);
    }

    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        return {
            winningIndex: count - 1,
            fullSpins: 3,
            spinDuration: 1000,
            initialTime: 0,
        };
    }
}

describe('useCircularMovement', () => {
    it.only('moves the items', () => {
        const initialItems: PositionalLayoutItem<{}>[] = [
            {
                position: {
                    x: 100,
                    y: 0,
                },
                radius: 10,
                units: 'px',
            },
            {
                position: {
                    x: 200,
                    y: 0,
                },
                radius: 10,
                units: 'px',
            },
        ];

        const circularMovement = new TestCircularMovement();

        const { result } = renderHook(() =>
            useCircularMovement({
                items: initialItems,
                winningPosition: { x: 0, y: 200 },
                center: { x: 0, y: 0 },
                radius: 200,
                units: 'px',
                interface: circularMovement,
            }),
        );

        const { winner, spin } = result.current;

        expect(winner).toBeNull();

        act(() => {
            spin();
            circularMovement.setTime(16);
            circularMovement.setTime(32);
            circularMovement.setTime(1000);
        });

        const { items } = result.current;

        expect(
            items.map((item) => item.position),
        ).not.toEqual(
            initialItems.map((item) => item.position),
        );

        expect(items).toEqual([]);
    });

    it('returns the winner', () => {});

    it('returns the winner immediately if winner is found', () => {
        const { result } = renderHook(() =>
            useCircularMovement({
                items: [
                    {
                        position: {
                            x: 100,
                            y: 0,
                        },
                        radius: 10,
                        units: 'px',
                    },
                    {
                        position: {
                            x: 200,
                            y: 0,
                        },
                        radius: 10,
                        units: 'px',
                    },
                ],
                winningPosition: { x: 200, y: 0 },
                center: { x: 0, y: 0 },
                radius: 200,
                units: 'px',
                interface: new DummyCircularMovement(),
            }),
        );

        expect(result.current.winner).toEqual({
            radius: 10,
            position: { x: 200, y: 0 },
            units: 'px',
        });
    });

    it('returns empty items and no winner if no items are provided', () => {
        const { result } = renderHook(() =>
            useCircularMovement({
                items: [],
                winningPosition: { x: 0, y: 0 },
                center: { x: 0, y: 0 },
                radius: 0,
                units: 'px',
                interface: new DummyCircularMovement(),
            }),
        );

        expect(result.current.items).toEqual([]);
        expect(result.current.winner).toBeNull();
    });

    it('returns empty items and no winner if no winning position is provided', () => {
        const { result } = renderHook(() =>
            useCircularMovement({
                items: [
                    {
                        id: '1',
                        image: 'https://placehold.co/200x200',
                        position: { x: 0, y: 0 },
                        radius: 0,
                        units: 'px',
                    },
                ],
                winningPosition: null,
                center: { x: 0, y: 0 },
                radius: 0,
                units: 'px',
                interface: new DummyCircularMovement(),
            }),
        );

        expect(result.current.items).toEqual([]);
    });
});
