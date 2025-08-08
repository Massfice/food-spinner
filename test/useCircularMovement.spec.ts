import { describe, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCircularMovement } from '../src/hooks/useCircularMovement';
import {
    PositionalLayoutItem,
    CircularMovementInterface,
} from '../src/types';

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
    it('moves the items', () => {
        const onWinnerFound = vi.fn();

        const initialItems: PositionalLayoutItem<{}>[] = [
            {
                index: 0,
                position: {
                    x: 100,
                    y: 0,
                },
                radius: 10,
                units: 'px',
            },
            {
                index: 1,
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
                onWinnerFound,
            }),
        );

        const { spin } = result.current;

        expect(onWinnerFound).toHaveBeenCalledWith(null);

        act(() => {
            spin(circularMovement);
            circularMovement.setTime(16);
            circularMovement.setTime(32);
        });

        const { items } = result.current;

        expect(
            items.map((item) => item.position),
        ).not.toEqual(
            initialItems.map((item) => item.position),
        );

        expect(items).toEqual([
            {
                index: 0,
                position: {
                    x: -64.3344926310006,
                    y: 189.37020108219698,
                },
                radius: 10,
                units: 'px',
            },
            {
                index: 1,
                position: {
                    x: -64.3344926310006,
                    y: 189.37020108219698,
                },
                radius: 10,
                units: 'px',
            },
        ]);
    });

    it('calls the onWinnerFound callback', () => {
        const onWinnerFound = vi.fn();

        const circularMovement = new TestCircularMovement();

        const { result } = renderHook(() =>
            useCircularMovement({
                items: [
                    {
                        index: 0,
                        radius: 0,
                        position: { x: 20, y: 0 },
                        units: 'px',
                    },
                ],
                winningPosition: {
                    x: 0,
                    y: 20,
                },
                center: { x: 0, y: 0 },
                radius: 20,
                units: 'px',
                onWinnerFound,
            }),
        );

        const { spin } = result.current;

        expect(onWinnerFound).toHaveBeenCalledWith(null);

        act(() => {
            spin(circularMovement);
            circularMovement.setTime(1000);
        });

        expect(onWinnerFound).toHaveBeenCalledWith({
            index: 0,
            radius: 0,
            position: { x: -1.9606728399089415e-14, y: 20 },
            units: 'px',
        });
    });

    it('calls the onWinnerFound callback immediately if winner is found', () => {
        const onWinnerFound = vi.fn();

        renderHook(() =>
            useCircularMovement({
                items: [
                    {
                        index: 0,
                        position: {
                            x: 100,
                            y: 0,
                        },
                        radius: 10,
                        units: 'px',
                    },
                    {
                        index: 1,
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
                onWinnerFound,
            }),
        );

        expect(onWinnerFound).toHaveBeenCalledWith({
            index: 1,
            radius: 10,
            position: { x: 200, y: 0 },
            units: 'px',
        });
    });

    it('returns empty items and no winner if no items are provided', () => {
        const onWinnerFound = vi.fn();

        const circularMovement = new TestCircularMovement();

        const { result } = renderHook(() =>
            useCircularMovement({
                items: [],
                winningPosition: { x: 0, y: 0 },
                center: { x: 0, y: 0 },
                radius: 0,
                units: 'px',
                onWinnerFound,
            }),
        );

        const { spin } = result.current;

        act(() => {
            spin(circularMovement);
            circularMovement.setTime(500);
        });

        expect(result.current.items).toEqual([]);
        expect(onWinnerFound).toHaveBeenCalledWith(null);
    });

    it('returns empty items and no winner if no winning position is provided', () => {
        const onWinnerFound = vi.fn();

        const circularMovement = new TestCircularMovement();

        const { result } = renderHook(() =>
            useCircularMovement({
                items: [
                    {
                        index: 0,
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
                onWinnerFound,
            }),
        );

        const { spin } = result.current;

        act(() => {
            spin(circularMovement);
            circularMovement.setTime(500);
        });

        expect(result.current.items).toEqual([]);
        expect(onWinnerFound).toHaveBeenCalledWith(null);
    });
});
