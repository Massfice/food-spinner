import type {
    Circle,
    CircularMovementInterface,
    Position,
    PositionalLayoutItem,
} from '../types';
import {
    calculateClockwiseDfiff,
    calculateCounterClockwiseDiff,
    getAngle,
    positive,
} from './math';

abstract class AnimatedCircularMovement
    implements CircularMovementInterface
{
    abstract randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    };

    forwardTime(callback: (time: number) => void): void {
        requestAnimationFrame(callback);
    }
}

export class RandomizedCircularMovement extends AnimatedCircularMovement {
    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        const winningIndex = Math.floor(
            Math.random() * count,
        );
        const fullSpins = Math.floor(Math.random() * 5) + 1; // 1 to 5
        const spinDuration = (Math.random() * 5 + 1) * 1000; // 1 to 6 seconds in milliseconds
        const initialTime = performance.now();

        return {
            winningIndex,
            fullSpins,
            spinDuration,
            initialTime,
        };
    }
}

export class NearestCircularMovement extends AnimatedCircularMovement {
    private readonly direction:
        | 'clockwise'
        | 'counterclockwise';

    private readonly winner: PositionalLayoutItem<Circle> | null;

    private readonly items: PositionalLayoutItem<Circle>[];

    private readonly center: Position;

    constructor(
        winner: PositionalLayoutItem<Circle> | null,
        direction: 'clockwise' | 'counterclockwise',
        items: PositionalLayoutItem<Circle>[],
        center: Position,
    ) {
        super();

        this.winner = winner;
        this.direction = direction;
        this.items = items;
        this.center = center;
    }

    randomize(_count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        if (!this.winner) {
            throw new Error('No winner provided');
        }

        if (this.items.length < 2) {
            throw new Error(
                'There must be at least 2 items',
            );
        }

        const spinDuration = 100;

        const { winningIndex, fullSpins } =
            this.direction === 'clockwise'
                ? this.getDataClockwise()
                : this.getDataCounterClockwise();

        return {
            winningIndex,
            fullSpins,
            spinDuration,
            initialTime: performance.now(),
        };
    }

    private getDataClockwise(): {
        winningIndex: number;
        fullSpins: number;
    } {
        const { index, negative } = this.getData(
            calculateClockwiseDfiff,
        );

        return {
            winningIndex: index,
            fullSpins: negative ? 1 : 0,
        };
    }

    private getDataCounterClockwise(): {
        winningIndex: number;
        fullSpins: number;
    } {
        const { index, negative } = this.getData(
            calculateCounterClockwiseDiff,
        );

        return {
            winningIndex: index,
            fullSpins: negative ? 1 : 0,
        };
    }

    private getData(
        calculate: (
            angle1: number,
            angle2: number,
        ) => number,
    ): { index: number; negative: boolean } {
        const winnerAngle = getAngle(
            this.winner!.position.x,
            this.winner!.position.y,
            this.center,
        );

        const [{ index, negative }] = this.items
            .map((item) => {
                const angle = getAngle(
                    item.position.x,
                    item.position.y,
                    this.center,
                );

                const diff = calculate(winnerAngle, angle);

                return {
                    index: item.index,
                    diff,
                    negative: diff < 0,
                };
            })
            .filter((item) => item.diff !== 0)
            .map((item) => ({
                ...item,
                diff: positive(item.diff),
            }))
            .sort((a, b) => a.diff - b.diff);

        return { index, negative };
    }
}
