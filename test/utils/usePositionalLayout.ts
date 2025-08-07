import { useState } from 'react';
import { usePositionalLayout as usePositionalLayoutHook } from '../../src/hooks/usePositionalLayout';

export const usePositionalLayout = <
    T extends Record<string, unknown>,
>(
    props: Parameters<typeof usePositionalLayoutHook<T>>[0],
) => {
    const [items, setItems] = useState(props.items);
    const [center] = useState(props.center);
    const [radius] = useState(props.radius);
    const [ratio] = useState(props.ratio);
    const [evenDistributionThreshold] = useState(
        props.evenDistributionThreshold,
    );

    return {
        ...usePositionalLayoutHook<T>({
            items,
            center,
            radius,
            ratio,
            evenDistributionThreshold,
        }),
        setItems,
    };
};
