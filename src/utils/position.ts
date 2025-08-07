import type { Units } from '../types';
import type { CirclePosition } from '../components/CirclesWrapper';

type CorrectedPosition = {
    bottom: string;
    left: string;
};

/**
 *
 * When we are positioning the circle, coordinates refers to the corner of the circle.
 * But we want to position the circle from the center.
 *
 * @param {PositionCircle} position - The position of the circle.
 * @param {number} radius - The radius of the circle.
 * @param {Units} units - The units of the circle.
 * @returns {CorrectedPosition} The corrected position of the circle.
 */
export const positionCircle = (
    position: CirclePosition,
    radius: number,
    units: Units,
): CorrectedPosition => {
    return {
        bottom: `${position.y - radius}${units}`,
        left: `${position.x - radius}${units}`,
    };
};
