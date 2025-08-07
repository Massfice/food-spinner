import { describe, it, expect } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { usePositionalLayout } from './utils/usePositionalLayout';

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
                position: {
                    x: 12.944271909999157,
                    y: -9.404564036679574,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[1],
                position: {
                    x: 4.944271909999156,
                    y: -15.216904260722458,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[2],
                position: {
                    x: -4.944271909999161,
                    y: -15.216904260722456,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[3],
                position: {
                    x: -12.94427190999916,
                    y: -9.404564036679568,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[4],
                position: {
                    x: -16,
                    y: 1.959434878635765e-15,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[5],
                position: {
                    x: -12.944271909999157,
                    y: 9.404564036679572,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[6],
                position: {
                    x: -4.944271909999157,
                    y: 15.216904260722458,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[7],
                position: {
                    x: 4.944271909999159,
                    y: 15.216904260722456,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[8],
                position: {
                    x: 12.94427190999916,
                    y: 9.40456403667957,
                },
                radius: 1.92,
                units: '%',
            },
            {
                ...testItems[9],
                position: {
                    x: 16,
                    y: 0,
                },
                radius: 1.92,
                units: '%',
            },
        ]);
    });
});
