import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePositionalLayout } from './utils/usePositionalLayout';
import { calculateWinningPosition } from '../src/hooks/usePositionalLayout';

describe('usePositionalLayout', () => {
    it('calculates position, radius and units', () => {
        const item = { id: 1 };

        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [item],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { items } = result.current;

        expect(items).toEqual([
            {
                ...item,
                index: 0,
                position: {
                    x: 9.797174393178826e-16,
                    y: 16,
                },
                radius: 4,
                units: '%',
            },
        ]);
    });

    it('returns empty array if no items are provided', () => {
        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { items, winningPosition } = result.current;

        expect(items).toEqual([]);
        expect(winningPosition).toBeNull();
    });

    it('clones items', () => {
        const item = { id: 1 };

        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [item],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const {
            items: [resultItem],
        } = result.current;

        expect(resultItem).not.toBe(item);
        expect(resultItem.id).toBe(item.id);
    });

    it('updates items', () => {
        let testItems = [{ id: 1 }];

        const { result } = renderHook(() =>
            usePositionalLayout({
                items: testItems,
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { items, setItems } = result.current;

        expect(items.length).toBe(1);

        testItems = [
            ...testItems,
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
        ];

        act(() => {
            setItems(testItems);
        });

        const { items: updatedItems } = result.current;

        expect(updatedItems).toEqual([
            {
                ...testItems[0],
                index: 0,
                position: {
                    x: 12.944271909999157,
                    y: -9.404564036679574,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[1],
                index: 1,
                position: {
                    x: 4.944271909999156,
                    y: -15.216904260722458,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[2],
                index: 2,
                position: {
                    x: -4.944271909999161,
                    y: -15.216904260722456,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[3],
                index: 3,
                position: {
                    x: -12.94427190999916,
                    y: -9.404564036679568,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[4],
                index: 4,
                position: {
                    x: -16,
                    y: 1.959434878635765e-15,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[5],
                index: 5,
                position: {
                    x: -12.944271909999157,
                    y: 9.404564036679572,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[6],
                index: 6,
                position: {
                    x: -4.944271909999157,
                    y: 15.216904260722458,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[7],
                index: 7,
                position: {
                    x: 4.944271909999159,
                    y: 15.216904260722456,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[8],
                index: 8,
                position: {
                    x: 12.94427190999916,
                    y: 9.40456403667957,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[9],
                index: 9,
                position: {
                    x: 16,
                    y: 0,
                },
                radius: 1.92,
                units: '%',
            },
        ]);
    });

    it('returns winning position', () => {
        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [{ id: 1 }],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { winningPosition } = result.current;

        expect(winningPosition).toEqual({
            x: 9.797174393178826e-16,
            y: 16,
        });
    });

    it('calculates winning positions', () => {
        const positions: { x: number; y: number }[] = [];

        expect(positions.length).toBe(0);
        let winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toBeNull();

        positions.push({ x: 0, y: 0 }); // first position -> first item
        expect(positions.length).toBe(1);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[0]);

        positions.push({ x: 1, y: 1 }); // second position -> second item
        expect(positions.length).toBe(2);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[1]);

        positions.push({ x: 2, y: 2 }); // third postion -> third item
        expect(positions.length).toBe(3);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[2]);

        positions.push({ x: 3, y: 3 }); // fourth position -> third item
        expect(positions.length).toBe(4);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[2]);

        positions.push({ x: 4, y: 4 }); // fifth position -> fourth item
        expect(positions.length).toBe(5);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[3]);

        positions.push({ x: 5, y: 5 }); // sixth position -> fourth item
        expect(positions.length).toBe(6);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[3]);

        positions.push({ x: 6, y: 6 }); // seventh position -> fifth item
        expect(positions.length).toBe(7);
        winningPosition =
            calculateWinningPosition(positions);
        expect(winningPosition).toEqual(positions[4]);
    });

    it('updates winning position', () => {
        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [{ id: 1 }],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { winningPosition, setItems } =
            result.current;

        expect(winningPosition).toEqual({
            x: 9.797174393178826e-16,
            y: 16,
        });

        act(() => {
            setItems([
                { id: 1 },
                { id: 2 },
                { id: 3 },
                { id: 4 },
                { id: 5 },
                { id: 6 },
                { id: 7 },
                { id: 8 },
                { id: 9 },
            ]);
        });

        const { winningPosition: updatedWinningPosition } =
            result.current;

        expect(updatedWinningPosition).toEqual({
            x: -7.9999999999999964,
            y: 13.85640646055102,
        });
    });

    it('returns winning position as null if no items are provided', () => {
        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { winningPosition } = result.current;

        expect(winningPosition).toBeNull();
    });

    it('returns correct center, radius and units', () => {
        const { result } = renderHook(() =>
            usePositionalLayout({
                items: [{ id: 1 }],
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { center, radius, units } = result.current;

        expect(center).toEqual({ x: 0, y: 0 });
        expect(radius).toEqual(16);
        expect(units).toEqual('%');
    });
});
