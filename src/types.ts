import EventEmitter from 'events';

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
    index: number;
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
     * The index of the circle.
     */
    index: number;

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

    name: string;
    price: number;
    description: string;
    color: string;
};

export type PositionalLayoutReturn<
    T extends Record<string, unknown>,
> = {
    /**
     * The items to layout.
     */
    items: PositionalLayoutItem<T>[];

    /**
     * The winning position calculated by the algorithm.
     */
    winningPosition: Position | null;

    /**
     * The center of the spinner.
     */
    center: Position;

    /**
     * The radius of the spinner.
     */
    radius: number;

    /**
     * The units of the spinner.
     */
    units: Units;
};

export type CircularMovementReturn<
    T extends Record<string, unknown>,
> = {
    items: PositionalLayoutItem<T>[];
    spin: (
        circularMovement: CircularMovementInterface,
    ) => void;
};

export interface CircularMovementInterface {
    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    };
    forwardTime(callback: (time: number) => void): void;
}

export class SpinnerEventEmmitter extends EventEmitter<{
    spin: [];
    forward: ['clockwise' | 'counterclockwise'];
}> {}

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    color: string;
};
