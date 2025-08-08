import type {
    Circle,
    CircularMovementInterface,
    PositionalLayoutItem,
} from '../types';

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

    constructor(
        winner: PositionalLayoutItem<Circle> | null,
        direction: 'clockwise' | 'counterclockwise',
    ) {
        super();

        this.winner = winner;
        this.direction = direction;
    }

    randomize(count: number): {
        winningIndex: number;
        fullSpins: number;
        spinDuration: number;
        initialTime: number;
    } {
        const randomValue = Math.random() * 700 + 300; // 300 to 1000

        if (count < 2 || !this.winner) {
            return {
                winningIndex: 0,
                fullSpins: 0,
                spinDuration: randomValue,
                initialTime: performance.now(),
            };
        }

        let winningIndex = this.winner.index;

        if (this.direction === 'clockwise') {
            winningIndex--;

            if (winningIndex < 0) {
                winningIndex = count - 1;
            }
        }

        if (this.direction === 'counterclockwise') {
            winningIndex++;

            if (winningIndex >= count) {
                winningIndex = 0;
            }
        }

        return {
            winningIndex,
            fullSpins: 0,
            spinDuration: randomValue,
            initialTime: performance.now(),
        };
    }
}
