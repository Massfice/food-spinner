export type Position = {
    x: number;
    y: number;
};

export type Units =
    | 'px'
    | 'rem'
    | 'em'
    | 'vw'
    | 'vh'
    | 'vmin'
    | 'vmax'
    | '%';

export type PositionalLayoutItem<
    T extends Record<string, unknown>,
> = T & {
    position: Position;
    radius: number;
    units: Units;
};

export type PositionalLayoutProps<
    T extends Record<string, unknown>,
> = {
    /**
     * The list of items to layout.
     */
    items: T[];

    /**
     * The center of the circle.
     */
    center: Position;

    /**
     * The radius of the circle.
     */
    radius: number;

    /**
     * The ratio of the radius to the number of items.
     */
    ratio: number;

    /**
     * The even distribution threshold.
     */
    evenDistributionThreshold: number;
};

export type Circle = {
    /**
     * The id of the circle.
     */
    id: string;

    /**
     * The image to display in the circle.
     */
    image: string;

    /**
     * The position of the circle.
     */
    position: Position;

    /**
     * The radius of the circle.
     */
    radius: number;

    /**
     * The units of the circle.
     */
    units: Units;
};

export type PositionalLayoutReturn<
    T extends Record<string, unknown>,
> = {
    items: PositionalLayoutItem<T>[];
    winningPosition: Position | null;
    center: Position;
    radius: number;
    units: Units;
};
