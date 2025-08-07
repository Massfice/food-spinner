import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
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
                    x: -11.33620958707637,
                    y: -11.291162570695622,
                },
                radius: 19.2,
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

        const { result, rerender } = renderHook(() =>
            usePositionalLayout({
                items: testItems,
                center: { x: 0, y: 0 },
                radius: 16,
                ratio: 1.2,
                evenDistributionThreshold: 3,
            }),
        );

        const { items, setItems } = result.current;

        expect(items).toEqual([
            {
                ...items[0],
                position: {
                    x: -11.33620958707637,
                    y: -11.291162570695622,
                },
                radius: 19.2,
                units: '%',
            },
        ]);

        testItems = [...testItems, { id: 2 }];

        setItems(testItems);

        rerender();

        const { items: updatedItems } = result.current;

        expect(updatedItems).toEqual([
            {
                ...testItems[0],
                position: {
                    x: -11.33620958707637,
                    y: -11.291162570695622,
                },
                radius: 9.6,
                units: '%',
            },
            {
                ...testItems[1],
                position: {
                    x: 11.291162570695622,
                    y: -11.33620958707637,
                },
                radius: 9.6,
                units: '%',
            },
        ]);
    });
});
